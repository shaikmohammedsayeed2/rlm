from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from models import Base

SQLALCHEMY_DATABASE_URL = "postgresql://coppar.lab:4fgRSFVpX6bA@ep-spring-forest-82897106.ap-southeast-1.aws.neon.tech/neondb"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)