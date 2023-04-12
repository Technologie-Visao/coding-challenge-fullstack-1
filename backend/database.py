import sqlite3


class Database:
    """Singleton Implementation of a SQLite3 Database"""

    extension = "db"
    instance = None

    def __new__(cls, *args, **kwargs) -> 'Database':
        """
        Creates a new instance of the Database class.
        :param args: list
        :param kwargs: dict
        :return: Database
        """
        if not cls.instance:
            cls.instance = super().__new__(cls)
        return cls.instance

    def __init__(self, file_name: str, query: str) -> None:
        """
        Initializes the Database class.
        :param file_name: str
        :param query: str
        :return: None
        """
        if not file_name.endswith(self.extension):
            raise ValueError("{} must end with {}".format(file_name, self.extension))
        self.file_name = file_name
        self.connection = sqlite3.connect(self.file_name)
        self.cursor = self.connection.cursor()
        self.cursor.execute(query)
        self.connection.commit()

    def insert(self, query: str, data: dict) -> None:
        """
        INSERT operations.
        :param query: str
        :param data: dict
        :return: None
        """
        with self.connection:
            self.cursor.execute(query, data)
        self.connection.commit()

    def select(self, query: str) -> list[tuple]:
        """
        SELECT from the Database.
        :param query: str
        :return: list[tuple]
        """
        with self.connection:
            return self.cursor.execute(query).fetchall()
