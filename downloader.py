import yt_dlp
import sys
import json
from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import io

app = Flask(__name__)
CORS(app)

@app.route('/test', methods=['GET'])
def test_url():
    url = request.args.get('url')
    if not url:
        return jsonify({'error': 'URL obrigatória'}), 400
    
    try:
        ydl_opts = {
            'quiet': True,
            'no_warnings': True,
            'simulate': True
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            return jsonify({
                'success': True,
                'title': info.get('title', 'Vídeo encontrado'),
                'duration': info.get('duration', 0)
            })
    except Exception as e:
        return jsonify({
            'error': 'URL inválida ou vídeo não disponível',
            'details': str(e)
        }), 400

@app.route('/download', methods=['GET'])
def download_video():
    url = request.args.get('url')
    if not url:
        return 'URL obrigatória', 400
    
    try:
        ydl_opts = {
            'format': 'mp4/best',
            'quiet': True,
            'no_warnings': True,
            'outtmpl': '-'
        }
        
        def generate():
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=False)
                formats = info.get('formats', [])
                
                # Encontra melhor formato
                best_format = None
                for f in formats:
                    if f.get('ext') == 'mp4':
                        best_format = f
                        break
                
                if not best_format:
                    best_format = formats[0] if formats else None
                
                if best_format:
                    video_url = best_format['url']
                    import requests
                    response = requests.get(video_url, stream=True)
                    for chunk in response.iter_content(chunk_size=8192):
                        if chunk:
                            yield chunk
        
        return Response(
            generate(),
            mimetype='application/octet-stream',
            headers={
                'Content-Disposition': 'attachment; filename="video.mp4"',
                'Access-Control-Allow-Origin': '*'
            }
        )
        
    except Exception as e:
        return f'Erro no download: {str(e)}', 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)