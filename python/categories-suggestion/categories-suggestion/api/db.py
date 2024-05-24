import os
from dataclasses import dataclass
import edgedb
from edgedb import create_async_client
from typing import Optional
from dotenv import load_dotenv

@dataclass
class EdgeDBConnection:
    dsn: Optional[str] = None
    host: Optional[str] = None
    port: int = 5656
    admin: Optional[bool] = False
    user: Optional[str] = None
    password: Optional[str] = None
    database: Optional[str] = None
    timeout: int = 60
    instance_name: Optional[str] = None

    def from_env(self):
        self.dsn = os.getenv('EDGE_DB_DSN')
        self.host = os.getenv('EDGE_DB_HOST')
        self.port = int(os.getenv('EDGE_DB_PORT', self.port))
        self.admin = os.getenv('EDGE_DB_ADMIN', 'False').lower() in ('true', '1', 'yes')
        self.user = os.getenv('EDGE_DB_USER')
        self.password = os.getenv('EDGE_DB_PASSWORD')
        self.database = os.getenv('EDGE_DB_DATABASE')
        self.timeout = int(os.getenv('EDGE_DB_TIMEOUT', self.timeout))
        self.instance_name = os.getenv('EDGE_DB_INSTANCE_NAME')

async def async_connect():
    connection = EdgeDBConnection()
    connection.from_env()

    if connection.params.instance_name:
        client = await create_async_client(instance_name=connection.instance_name)
    else:
        client = await create_async_client(
            dsn=connection.dsn,
            host=connection.host,
            port=connection.port,
            admin=connection.admin,
            user=connection.user,
            password=connection.password,
            database=connection.database,
            timeout=connection.timeout,)
        
    return client