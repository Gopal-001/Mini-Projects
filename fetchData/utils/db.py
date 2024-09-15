from configparser import ConfigParser
import os
import psycopg2


parser = ConfigParser()
parser.read('config.ini')
env = os.getenv('ENV', 'DEV')

DB_NAME = os.getenv('DB_NAME', parser.get(env, 'DB_NAME'))
DB_USERNAME = os.getenv('DB_USERNAME', parser.get(env, 'DB_USERNAME'))
DB_PASSWORD = os.getenv('DB_PASSWORD', parser.get(env, 'DB_PASSWORD'))
DB_HOST = os.getenv('DB_HOST', parser.get(env, 'DB_HOST'))
DB_PORT = os.getenv('DB_PORT', parser.get(env, 'DB_PORT'))
DB_URL = os.getenv('DB_URL', parser.get(env, 'DB_URL'))

def fetch_one_result(query, data=None):
    try:
        # conn = psycopg2.connect(DB_URL)
        conn = psycopg2.connect(
            user=DB_USERNAME,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT,
            dbname=DB_NAME,
            sslmode='require'
        )   
        conn.set_session(autocommit = True)
        cursor = conn.cursor(cursor_factory = psycopg2.extras.RealDictCursor)
        cursor.execute(query, data)
        return cursor.fetchone()
    except Exception as e:
        print(f'Fetch Failure {str(e)}')
        return None
    finally:
        try:
            cursor.close()
            conn.close()
        except Exception as e:
            print(f' Failed to close db conn {str(e)}')