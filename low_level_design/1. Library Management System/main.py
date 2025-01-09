from typing import List, Dict, Optional, Literal, Union
from datetime import date, datetime, timedelta
from abc import ABC, abstractmethod
import uuid
from enum import Enum

class BookFormat(Enum):
    HARDCOVER = "Hardcover"
    PAPERBACK = "Paperback"
    AUDIOBOOK = "Audiobook"
    EBOOK = "EBook"

class BookStatus(Enum):
    AVAILABLE = "Available"
    RESERVED = "Reserved"
    LOANED = "Loaned"
    LOST = "Lost"

class ReservationStatus(Enum):
    WAITING = "Waiting"
    PENDING = "Pending"
    COMPLETED = "Completed"
    CANCELED = "Canceled"

class Param:
    def __init__(self, title: str = "", author: str = "", subject: str = "", publication_date: Optional[date] = None):
        self.title = title
        self.author = author
        self.subject = subject
        self.publication_date = publication_date

class Specification(ABC):
    @abstractmethod
    def is_satisfied(self, param: Param, book: 'Book') -> bool:
        pass

class TitleSpecification(Specification):
    def is_satisfied(self, param: Param, book: 'Book') -> bool:
        return param.title.lower() in book.title.lower()

class AndSpecification(Specification):
    def __init__(self, spec1: Specification, spec2: Specification):
        self.spec1 = spec1
        self.spec2 = spec2
    
    def is_satisfied(self, param: Param, book: 'Book') -> bool:
        return self.spec1.is_satisfied(param, book) and self.spec2.is_satisfied(param, book)

class Book:
    def __init__(self, isbn: str, title: str):
        self.isbn = isbn
        self.title = title
        self.author = ""
        self.subject = ""
        self.publisher = ""
        self.publish_date: Optional[date] = None
        self.language = ""
        self.num_of_pages = 0

class BookItem(Book):
    def __init__(self, isbn: str, title: str):
        super().__init__(isbn, title)
        self.barcode = str(uuid.uuid4())
        self.borrowed: Optional[date] = None
        self.due_date: Optional[date] = None
        self.price = 0.0
        self.format: BookFormat = BookFormat.HARDCOVER
        self.status: BookStatus = BookStatus.AVAILABLE
        self.borrower_id: Optional[str] = None

    def checkout(self) -> bool:
        if self.status != BookStatus.AVAILABLE:
            return False
        self.status = BookStatus.LOANED
        return True

class Notification(ABC):
    def __init__(self):
        self.notification_id = str(uuid.uuid4())
        self.created_on = datetime.now()
        self.content = ""

    @abstractmethod
    def send_notification(self) -> bool:
        pass

class EmailNotification(Notification):
    def __init__(self, email: str):
        super().__init__()
        self.email = email

    def send_notification(self) -> bool:
        # Implementation for sending email
        return True

class PostalNotification(Notification):
    def __init__(self, address: str):
        super().__init__()
        self.address = address

    def send_notification(self) -> bool:
        # Implementation for sending postal notification
        return True

class Transaction:
    def __init__(self, amount: float):
        self.created_on = datetime.now()
        self.amount = amount

class CreditCardTransaction(Transaction):
    def __init__(self, amount: float):
        super().__init__(amount)
        self.name_on_card = ""
        self.card_number = ""
        self.expiry = date.today()
        self.pin = ""

class Fine:
    def __init__(self, amount: float = 0.0):
        self.amount = amount

class Reservation:
    def __init__(self, book: BookItem, member: 'Member'):
        self.creation_date = date.today()
        self.book = book
        self.status = ReservationStatus.WAITING
        self.member = member

class Member:
    def __init__(self):
        self.member_id = str(uuid.uuid4())
        self.date_of_membership = date.today()
        self.password = ""
        self.email = ""
        self.address = ""
        self.reservations: List[Reservation] = []
        self.books: List[BookItem] = []

    def get_total_checked_out_books(self) -> int:
        return len(self.books)

class LibraryManagementSystem:
    def __init__(self):
        self.books: List[BookItem] = []
        self.members: List[Member] = []
        self.reservations: List[Reservation] = []
        self.MAX_BOOKS_PER_USER = 5

    def make_reservation(self, book: BookItem, member: Member) -> Optional[Reservation]:
        if book.status != BookStatus.AVAILABLE:
            reservation = Reservation(book, member)
            self.reservations.append(reservation)
            member.reservations.append(reservation)
            book.status = BookStatus.RESERVED
            return reservation
        return None

    def search(self, param: Param, spec: Specification) -> List[BookItem]:
        return [book for book in self.books if spec.is_satisfied(param, book)]

    def send_notification(self, notification: Notification, member: Member) -> bool:
        return notification.send_notification()

    def checkout(self, book: BookItem, member: Member) -> bool:
        if (member.get_total_checked_out_books() >= self.MAX_BOOKS_PER_USER or
            not book.checkout()):
            return False
        
        book.borrower_id = member.member_id
        book.borrowed = date.today()
        book.due_date = date.today() + timedelta(days=14)
        member.books.append(book)
        return True

    def return_book(self, book: BookItem) -> Fine:
        if not book.due_date or not book.borrowed:
            return Fine()

        days_overdue = (date.today() - book.due_date).days
        fine_amount = max(0, days_overdue * 1.0)  # $1 per day overdue
        
        book.status = BookStatus.AVAILABLE
        book.borrower_id = None
        book.borrowed = None
        book.due_date = None
        
        return Fine(fine_amount)

    def make_payment(self, fine: Fine, transaction: Transaction) -> bool:
        return transaction.amount >= fine.amount
    




# Example usage:
book = BookItem(isbn="1234567890", title="The Great Gatsby")
member = Member()

# Create a reservation with the initial status as WAITING
reservation = Reservation(book, member)

print(f"Initial reservation status: {reservation.status.name}")

# Update the reservation status to PENDING
reservation.status = ReservationStatus.PENDING
print(f"Updated reservation status: {reservation.status.name}")

# Update the reservation status to COMPLETED
reservation.status = ReservationStatus.COMPLETED
print(f"Final reservation status: {reservation.status.name}")