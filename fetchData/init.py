from utils.db import fetch_one_result

fetch_schema_query = '''
WITH schema AS (
    SELECT
        table_catalog,
        table_schema,
        table_name,
        column_name, 
        ordinal_position,
        column_default,
        is_nullable,
        data_type,
        character_maximum_length
    FROM
        information_schema.columns
    WHERE table_schema NOT IN ('pg_%', 'testing', 'public', 'information_schema')
),
constrains AS (
    SELECT 
        table_schema, 
        table_name, 
        column_name, 
        'PRIMARY KEY' AS constraint_type
    FROM information_schema.key_column_usage AS kcu
    WHERE kcu.constraint_name LIKE '%pkey' 
        AND kcu.table_schema NOT IN ('pg_%', 'testing', 'public', 'information_schema')
)
SELECT 
    s.table_catalog,
    s.table_schema,
    s.table_name,
    s.column_name, 
    s.ordinal_position,
    s.column_default,
    s.is_nullable,
    s.data_type,
    s.character_maximum_length,
    c.constraint_type 
FROM schema s
LEFT JOIN constrains c 
    ON c.table_schema = s.table_schema 
    AND c.table_name = s.table_name 
    AND c.column_name = s.column_name
ORDER BY s.table_schema, s.table_name, s.ordinal_position
'''
result = fetch_one_result(fetch_one_result)
print(result)