from configparser import ConfigParser
import os
import psycopg2
import psycopg2.extras


parser = ConfigParser()
parser.read('config.ini')
env = os.getenv('ENV', 'DEV')

DB_NAME = os.getenv('DB_NAME')
DB_USERNAME = os.getenv('DB_USERNAME')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')
DB_URL = os.getenv('DB_URL')

def fetch_one_result(query, data=None):
    try:
        # Explicitly create a TCP connection
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USERNAME,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        )
        conn.set_session(autocommit=True)
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute(query, data)
        return cursor.fetchone()
    except Exception as e:
        print(f'Fetch Failure: {type(e).__name__}: {str(e)}')
        print(f'Connection details: host={DB_HOST}, port={DB_PORT}, dbname={DB_NAME}, user={DB_USERNAME}')
        return None
    finally:
        try:
            if cursor:
                cursor.close()
            if conn:
                conn.close()
        except Exception as e:
            print(f'Failed to close db conn {str(e)}')