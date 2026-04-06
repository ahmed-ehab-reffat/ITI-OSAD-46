# 📦 Archive.zip — Full Detailed Explanation
## Every File, Every Line, Every Detail

---

## 🗂️ First — What Is Inside The Archive?

```
archive/
│
├── manage.py                          ← remote control of the project
├── db.sqlite3                         ← the database file
├── req.txt                            ← list of required libraries
│
├── iti/                               ← PROJECT folder (settings live here)
│   ├── settings.py                    ← all project settings
│   ├── urls.py                        ← main front door of the website
│   ├── wsgi.py                        ← for deployment (ignore for now)
│   └── asgi.py                        ← for deployment (ignore for now)
│
└── supermarket/                       ← APP folder (our actual work)
    ├── models.py                      ← defines database tables
    ├── views.py                       ← the brain — handles requests
    ├── urls.py                        ← roads inside the app
    ├── admin.py                       ← controls the admin panel
    ├── apps.py                        ← app configuration
    ├── tests.py                       ← for testing (not used here)
    ├── migrations/                    ← database change history
    │   ├── 0001_initial.py            ← first migration (created tables)
    │   └── 0002_alter_products_name.py← second migration (changed a field)
    └── templates/
        ├── home.html                  ← the home page
        └── products.html             ← the products page
```

---

## 🧠 Big Picture — How Django Works

Before explaining each file, you need to understand the big picture.

When a user types a URL in the browser, here is what happens step by step:

```
User types URL in browser
        ↓
Django receives the request
        ↓
iti/urls.py → checks which app to send it to
        ↓
supermarket/urls.py → checks which function to call
        ↓
supermarket/views.py → the function runs
        ↓
views.py talks to models.py → gets data from database
        ↓
views.py sends data to HTML template
        ↓
HTML template shows the page to the user
```

Think of it like ordering food at a restaurant:
```
You (user)         → places an order (types a URL)
Waiter (urls.py)   → takes the order to the right kitchen
Chef (views.py)    → prepares the food
Fridge (models.py) → where ingredients (data) are stored
Plate (HTML)       → what you see when food arrives
```

---

## 📄 FILE 1: `req.txt`

```
asgiref==3.11.1
Django==6.0.3
sqlparse==0.5.5
```

### What is this file?
This is a list of all the Python libraries this project needs.
Think of it like a shopping list.

### Line by line:

```
Django==6.0.3
```
The main Django framework. Version 6.0.3 specifically.
`==` means "exactly this version".

```
asgiref==3.11.1
```
A helper library that Django uses internally.
You never use this directly — Django uses it behind the scenes.

```
sqlparse==0.5.5
```
A library that helps Django format and read SQL (database language).
Again, you never use this directly.

### How to use this file?
```bash
pip install -r req.txt
```
This command reads the file and installs everything in it automatically.
Same as `pip install django` but installs ALL libraries at once!

---

## 📄 FILE 2: `manage.py`

```python
#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "iti.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
```

### What is this file?
This is the **remote control** of the entire Django project.
You NEVER edit this file. You only use it to run commands.

### Line by line:

```python
#!/usr/bin/env python
```
This line tells the computer "use Python to run this file".
It is only needed on Linux/Mac systems.

```python
import os
import sys
```
`os` and `sys` are Python built-in modules (from our Python lecture!).
`os` = operating system tools.
`sys` = system tools (like reading command line arguments).

```python
def main():
```
This defines the main function — the starting point of the file.

```python
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "iti.settings")
```
This tells Django: "your settings file is at `iti/settings.py`".
`os.environ` = environment variables (like global settings for your computer).
`setdefault` = set this value only if it is not already set.

```python
try:
    from django.core.management import execute_from_command_line
except ImportError as exc:
    raise ImportError("Couldn't import Django...")
```
This uses `try/except` from our Python lecture!
- Try to import Django
- If it fails (Django not installed) → show a helpful error message

```python
execute_from_command_line(sys.argv)
```
`sys.argv` = the command you typed in the terminal.
For example: `python manage.py runserver`
`sys.argv` = `["manage.py", "runserver"]`
`execute_from_command_line` reads this and runs the correct Django command.

```python
if __name__ == "__main__":
    main()
```
This means: "only run `main()` if this file is being run directly".
This is a Python standard pattern — you will see it in many Python files.

### Commands you use with manage.py:
```bash
python manage.py runserver       # start the website
python manage.py makemigrations  # prepare database changes
python manage.py migrate         # apply database changes
python manage.py createsuperuser # create admin account
python manage.py startapp myapp  # create a new app
```

---

## 📄 FILE 3: `db.sqlite3`

### What is this file?
This is the **database** — it stores all the data.
In this project, it stores all the products.

### What is SQLite?
SQLite is a simple database that saves everything in ONE file (`db.sqlite3`).
No need to install a separate database server!

### Why can't you open it directly?
It is a binary file (not text) so you cannot read it like a normal file.
Django reads and writes to it automatically using `models.py`.

### The database table for this project looks like this:
```
Products Table:
| id | name    | price | quantity | date_added          | date_updated        |
|----|---------|-------|----------|---------------------|---------------------|
| 1  | Apple   | 5.0   | 100      | 2024-01-01 10:00:00 | 2024-01-01 10:00:00 |
| 2  | Banana  | 2.5   | 200      | 2024-01-01 11:00:00 | 2024-01-02 09:00:00 |
```

---

## 📄 FILE 4: `iti/settings.py`

This is the most important configuration file. Let us go through every section:

### Section 1: Path Setup
```python
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
```
`__file__` = the path of `settings.py` itself.
`.resolve()` = get the full absolute path.
`.parent` = go one folder up (from `iti/` to the project root).
`.parent` again = go one more folder up.

So `BASE_DIR` = the root folder of the project (where `manage.py` is).
This is used later to build other paths like the database location.

---

### Section 2: Security Settings
```python
SECRET_KEY = "django-insecure-t!*jil%ial@+ap&srvxta9y*djc@z2i=2b8(us%=xf910c_(-i"
```
A secret password Django uses for security (like encrypting cookies and forms).
NEVER share this with anyone in a real project!
`django-insecure-` at the start means "this is for development only".

```python
DEBUG = True
```
When `True` → Django shows detailed error pages when something goes wrong.
When `False` → Django hides errors (for when the website is live).
Always `True` during development!

```python
ALLOWED_HOSTS = ["*"]
```
Which domain names can access this website.
`"*"` = allow everyone (any domain).
In a real project you would put your actual domain like `["mywebsite.com"]`.

---

### Section 3: INSTALLED_APPS
```python
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "supermarket",
]
```

This is a Python **list** — exactly like the lists from our Python lecture!
Each item is a Django app. Let us explain each one:

```python
"django.contrib.admin"
```
The admin panel — the page at `/admin/` where you manage your data.
Django builds this automatically for free!

```python
"django.contrib.auth"
```
The login/logout system — handles users, passwords, permissions.

```python
"django.contrib.contenttypes"
```
A helper Django uses internally to track all the models/tables.

```python
"django.contrib.sessions"
```
Sessions — remembers who is logged in between page visits.
Like a memory for the website.

```python
"django.contrib.messages"
```
Flash messages — temporary messages that show once then disappear.

```python
"django.contrib.staticfiles"
```
Handles static files like CSS, JavaScript, and images.

```python
"supermarket"
```
**THIS IS OUR APP!** We added this manually.
Without this line, Django does not know our app exists.

---

### Section 4: MIDDLEWARE
```python
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]
```

Middleware = code that runs on EVERY request BEFORE it reaches the view.
Think of it like security checkpoints at an airport.

The most important one:
```python
"django.middleware.csrf.CsrfViewMiddleware"
```
This is the security system that requires `{% csrf_token %}` in every form.
It protects against hackers submitting fake forms.

---

### Section 5: ROOT_URLCONF
```python
ROOT_URLCONF = "iti.urls"
```
This tells Django: "the main URL file is at `iti/urls.py`".
This is the first place Django looks when a request comes in.

---

### Section 6: TEMPLATES
```python
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        ...
    },
]
```

```python
"APP_DIRS": True
```
This is the most important line here.
`True` = Django will automatically look for a `templates/` folder inside each app.
That is why putting `home.html` inside `supermarket/templates/` works!

```python
"DIRS": []
```
Extra folders to look for templates. Empty here because `APP_DIRS` is True.

---

### Section 7: DATABASE
```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}
```
This is a Python **dictionary** — exactly like the dictionaries from our Python lecture!

```python
"ENGINE": "django.db.backends.sqlite3"
```
Use SQLite as the database type.
Other options: PostgreSQL, MySQL — but SQLite is simplest for learning.

```python
"NAME": BASE_DIR / "db.sqlite3"
```
Save the database file at `BASE_DIR/db.sqlite3` (root of project).
`/` here is path joining (not division!) — Python's `pathlib` uses `/` to join paths.

---

### Section 8: STATIC_URL
```python
STATIC_URL = "static/"
```
The URL prefix for static files (CSS, JavaScript, images).
A file at `static/style.css` would be accessible at `http://site.com/static/style.css`.

---

## 📄 FILE 5: `iti/urls.py` — The Main Front Door

```python
from django.contrib import admin
from django.urls import include, path

from supermarket.views import home, products

urlpatterns = [
    path("admin/", admin.site.urls),
    path('supermarket/', include('supermarket.urls'))
]
```

### What is this file?
This is the MAIN entrance of the website.
Every request comes here first, then gets sent to the right place.

### Line by line:

```python
from django.contrib import admin
```
Import the admin module so we can use `admin.site.urls`.

```python
from django.urls import include, path
```
`path` = used to define a URL pattern.
`include` = used to "forward" URLs to another urls.py file.

```python
from supermarket.views import home, products
```
Import the `home` and `products` functions from views.py.
Note: these imports are here but NOT used in urlpatterns — they were probably left over. The actual routing uses `include()` instead.

```python
urlpatterns = [
```
`urlpatterns` is a Python **list** of URL patterns.
Django reads this list from top to bottom to find a match.

```python
    path("admin/", admin.site.urls),
```
If URL starts with `admin/` → go to Django's built-in admin panel.
`admin.site.urls` = a whole set of URLs that Django's admin uses internally.

```python
    path('supermarket/', include('supermarket.urls'))
```
If URL starts with `supermarket/` → pass the rest to `supermarket/urls.py`.

**Example:**
```
User types: http://127.0.0.1:8000/supermarket/products/
                                   ↓
iti/urls.py sees "supermarket/" → strips it → passes "products/" to supermarket/urls.py
                                   ↓
supermarket/urls.py sees "products/" → calls products() in views.py
```

---

## 📄 FILE 6: `supermarket/urls.py` — Roads Inside the App

```python
from django.contrib import admin
from django.urls import path

from supermarket.views import home, product_delete, products

urlpatterns = [
    path("", home, name="home"),
    path("products/", products, name="products"),
    path("products_delete/<int:id>/", product_delete, name="product_delete"),
]
```

### Line by line:

```python
from supermarket.views import home, product_delete, products
```
Import 3 functions from views.py.
These are the 3 functions that handle the 3 different URLs.

```python
path("", home, name="home"),
```
URL: `supermarket/` (empty string after supermarket/) → call `home()` function.
`name="home"` → give this URL the name "home" so we can use `{% url 'home' %}` in HTML.

```python
path("products/", products, name="products"),
```
URL: `supermarket/products/` → call `products()` function.
`name="products"` → name is "products".

```python
path("products_delete/<int:id>/", product_delete, name="product_delete"),
```
URL: `supermarket/products_delete/3/` → call `product_delete()` with `id=3`.

`<int:id>` is a **URL parameter** — explained in detail:
- `<` and `>` = this is a variable part of the URL
- `int` = the value must be a whole number (integer)
- `id` = the name of the variable passed to the function

**Examples:**
```
supermarket/products_delete/1/  → product_delete(request, id=1)
supermarket/products_delete/5/  → product_delete(request, id=5)
supermarket/products_delete/99/ → product_delete(request, id=99)
```

---

## 📄 FILE 7: `supermarket/models.py` — The Database Table

```python
from django.db import models

# Create your models here.

class Products(models.Model):
    # id = models.AutoField(primary_key=True)
    
    name = models.CharField(unique=True, max_length=100)
    price = models.FloatField()
    quantity = models.IntegerField()
    date_added = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
```

### What is a Model?
A model = a Python class that represents a database table.
Each attribute = one column in the table.

### Line by line:

```python
from django.db import models
```
Import Django's model tools.

```python
class Products(models.Model):
```
Create a class called `Products` that inherits from `models.Model`.
`models.Model` tells Django: "this class is a database table".

```python
# id = models.AutoField(primary_key=True)
```
This line is **commented out** (disabled).
Django automatically creates an `id` column for every model.
The instructor commented this out to show you that the `id` field exists automatically.

```python
name = models.CharField(unique=True, max_length=100)
```
`CharField` = stores text (like a Python string).
`unique=True` = no two products can have the same name.
`max_length=100` = maximum 100 characters allowed.

The database column looks like:
```
| name          |
|---------------|
| Apple         |  ✅ OK
| Apple         |  ❌ ERROR! unique=True means no duplicates
| This is a very long product name that has more than one hundred characters in it... | ❌ ERROR! max_length=100
```

```python
price = models.FloatField()
```
`FloatField` = stores decimal numbers (like Python `float`).
Examples: `5.99`, `10.0`, `0.5`

```python
quantity = models.IntegerField()
```
`IntegerField` = stores whole numbers (like Python `int`).
Examples: `100`, `50`, `0`

```python
date_added = models.DateTimeField(auto_now_add=True)
```
`DateTimeField` = stores date AND time (like `2024-01-15 14:30:00`).
`auto_now_add=True` = Django automatically sets this to RIGHT NOW when the product is first created.
You never need to set it yourself — Django does it automatically!

```python
date_updated = models.DateTimeField(auto_now=True)
```
`auto_now=True` = Django automatically updates this to RIGHT NOW every time the product is saved/changed.
So `date_added` never changes, but `date_updated` changes every time you edit the product.

```python
def __str__(self):
    return self.name
```
`__str__` = a special Python method that decides how to "print" this object.
When Django shows a product in the admin panel, it will show the product's `name` instead of something like `Products object (1)`.

---

## 📄 FILE 8: `supermarket/views.py` — The Brain ⭐

```python
from django.shortcuts import redirect, render
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import Products

# Create your views here.

def home(request):
    return render(request, "home.html")

def products(request):
    if request.method == "GET":
        products = Products.objects.all()
        return render(request, "products.html", {"products": products})
    
    elif request.method == "POST":
        name = request.POST.get("name")
        price = request.POST.get("price")
        quantity = request.POST.get("quantity")
        product = Products.objects.create(name=name, price=price, quantity=quantity)
        products = Products.objects.all()
        return render(request, "products.html", {"products": products, 'msg': f"Product {product.name} created successfully!"})
    
def product_delete(request, id):
        product = Products.objects.get(id=id)
        product.delete()
        products = Products.objects.all()
        return redirect("products")
```

### Line by line:

```python
from django.shortcuts import redirect, render
```
`render` = takes a template (HTML file) and sends it to the browser.
`redirect` = sends the user to a different URL.

```python
from django.http import HttpResponse, JsonResponse
```
`HttpResponse` = send a plain text response (like `return HttpResponse("Hello!")`).
`JsonResponse` = send a JSON response (used in APIs).
These are imported but not used in this file — the instructor imported them for reference.

```python
from django.shortcuts import render
```
`render` is imported again — this is a mistake/duplicate in the code. It does not cause an error but it is unnecessary.

```python
from .models import Products
```
`.` = from the same folder (the `supermarket` folder).
Import the `Products` model so we can use the database.
Same idea as `from students import find_student_name` from our Python modules lecture!

---

### Function 1: `home(request)`
```python
def home(request):
    return render(request, "home.html")
```
`request` = the user's request (contains information about what the user asked for).
`render(request, "home.html")` = find `home.html` in the templates folder and send it to the browser.

When is this called? When user visits `supermarket/`.

---

### Function 2: `products(request)`
```python
def products(request):
    if request.method == "GET":
        products = Products.objects.all()
        return render(request, "products.html", {"products": products})
```

```python
request.method
```
Every HTTP request has a method:
- `GET` = user just visited the page / clicked a link
- `POST` = user submitted a form

```python
if request.method == "GET":
```
If the user just opened the page (did not submit anything).

```python
products = Products.objects.all()
```
`Products.objects` = the database manager for the Products table.
`.all()` = get ALL rows from the Products table.
The result is like a Python list of product objects.

```python
return render(request, "products.html", {"products": products})
```
`{"products": products}` = a Python dictionary (from our Python lecture!).
This sends the products list to the HTML template.
In the HTML: `{{ products }}` or `{% for product in products %}` accesses this data.

---

```python
    elif request.method == "POST":
        name = request.POST.get("name")
        price = request.POST.get("price")
        quantity = request.POST.get("quantity")
```
`request.POST` = a dictionary containing all the form data the user submitted.
`.get("name")` = get the value from the form field named "name".

This matches the HTML form:
```html
<input type="text" name="name">    → request.POST.get("name")
<input type="text" name="price">   → request.POST.get("price")
<input type="text" name="quantity">→ request.POST.get("quantity")
```
The `name` attribute in HTML must match the key in `request.POST.get()`!

```python
        product = Products.objects.create(name=name, price=price, quantity=quantity)
```
`Products.objects.create(...)` = create a NEW row in the database.
This is like `append()` for a database — it adds a new product!
Returns the newly created product object saved in `product`.

```python
        products = Products.objects.all()
        return render(request, "products.html", {"products": products, 'msg': f"Product {product.name} created successfully!"})
```
After creating, get ALL products again (including the new one).
Send them to the template with a success message.

`f"Product {product.name} created successfully!"` = f-string from Python lecture!
`product.name` = the name of the product we just created.

---

### Function 3: `product_delete(request, id)`
```python
def product_delete(request, id):
        product = Products.objects.get(id=id)
        product.delete()
        products = Products.objects.all()
        return redirect("products")
```

```python
def product_delete(request, id):
```
`id` comes from the URL! When someone goes to `products_delete/3/`, Django passes `id=3` to this function.
This is set up in `urls.py` with `<int:id>`.

```python
product = Products.objects.get(id=id)
```
`.get(id=id)` = find ONE product where id equals the given id.
Different from `.all()` which gets everything.
If no product found → Django raises an error.

```python
product.delete()
```
Delete this product from the database permanently.

```python
products = Products.objects.all()
```
Get all products again. Note: this line is actually unnecessary here because the next line redirects — the products are never used. The instructor may have left it in by mistake.

```python
return redirect("products")
```
`redirect("products")` = send the user to the URL named "products".
The name "products" is defined in `urls.py`: `path("products/", products, name="products")`.
So the user is sent back to the products page after deleting.

---

## 📄 FILE 9: `supermarket/admin.py`

```python
from django.contrib import admin
from supermarket.models import Products

# Register your models here.
admin.site.register(Products)
```

### What is this file?
This connects your model to Django's admin panel.

### Line by line:

```python
from supermarket.models import Products
```
Import the Products model.

```python
admin.site.register(Products)
```
Tell Django's admin: "show the Products table in the admin panel".

After this, when you go to `http://127.0.0.1:8000/admin/`, you will see a "Products" section where you can:
- View all products
- Add new products
- Edit products
- Delete products

All of this is FREE — Django builds the entire interface automatically!

---

## 📄 FILE 10: `supermarket/apps.py`

```python
from django.apps import AppConfig


class SupermarketConfig(AppConfig):
    name = "supermarket"
```

### What is this file?
This is the configuration file for the `supermarket` app.
Django creates this automatically when you run `startapp`.

### Line by line:

```python
class SupermarketConfig(AppConfig):
```
A class that holds app configuration.

```python
name = "supermarket"
```
The name of the app — must match the folder name exactly.

### Do you need to edit this?
Almost never. Django uses it automatically.

---

## 📄 FILE 11: `supermarket/migrations/0001_initial.py`

```python
# Generated by Django 6.0.3 on 2026-03-23 09:13

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True
    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Products",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("price", models.FloatField()),
                ("quantity", models.IntegerField()),
                ("date_added", models.DateTimeField(auto_now_add=True)),
                ("date_updated", models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
```

### What is this file?
This is a **migration** — a file that records changes to the database.
Django generates this automatically when you run `python manage.py makemigrations`.
You NEVER write this manually!

### What is a migration?
Think of it like a history book of all database changes.
Every time you change `models.py`, Django creates a new migration file to record what changed.

### Line by line:

```python
initial = True
```
This is the FIRST migration — it creates the tables from scratch.

```python
dependencies = []
```
This migration does not depend on any previous migrations.
Later migrations will list earlier ones here.

```python
operations = [
    migrations.CreateModel(
        name="Products",
        fields=[...]
    ),
]
```
The operation is: create a table called "Products" with these fields.

```python
"id", models.BigAutoField(
    auto_created=True,
    primary_key=True,
    ...
)
```
This is the `id` column — Django added it automatically even though we did not write it in `models.py`!
`BigAutoField` = a big integer that automatically increases (1, 2, 3, 4...).
`primary_key=True` = this is the unique identifier for each row.

---

## 📄 FILE 12: `supermarket/migrations/0002_alter_products_name.py`

```python
# Generated by Django 6.0.3 on 2026-03-23 09:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("supermarket", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="products",
            name="name",
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
```

### What is this file?
This is the SECOND migration — it records a change that was made AFTER the first migration.

### What changed?
The instructor added `unique=True` to the `name` field AFTER creating the initial migration.

```python
dependencies = [
    ("supermarket", "0001_initial"),
]
```
This migration depends on the first one.
Django always runs migrations in order: `0001` then `0002` then `0003`...

```python
migrations.AlterField(
    model_name="products",
    name="name",
    field=models.CharField(max_length=100, unique=True),
)
```
`AlterField` = change an existing field.
Before: `name = models.CharField(max_length=100)`
After: `name = models.CharField(max_length=100, unique=True)`

This is how the instructor added `unique=True` after the table was already created!

---

## 📄 FILE 13: `supermarket/templates/home.html`

This is a template downloaded from W3Schools used as the home page.
It has a navbar, slideshow, sections, and a footer.

### The important Django parts:
There are actually NO Django template tags in `home.html`!
It is a pure HTML page — Django just serves it as-is.

### Key HTML parts explained:

```html
<link rel="stylesheet" href="https://www.w3schools.com/w3css/5/w3.css">
```
This loads W3.CSS — a CSS framework from W3Schools (like Bootstrap).
`w3-bar`, `w3-black`, `w3-button` etc. are all CSS classes from this framework.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
```
Font Awesome — a library of icons.
`<i class="fa fa-bars">` = the hamburger menu icon ☰

```html
<div class="mySlides w3-display-container w3-center">
    <img src="/w3images/la.jpg" style="width:100%">
</div>
```
These are the slideshow images.
`mySlides` = CSS class used by the JavaScript below to show/hide images.

```html
<script>
var myIndex = 0;
carousel();

function carousel() {
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) { myIndex = 1 }
    x[myIndex-1].style.display = "block";
    setTimeout(carousel, 4000);
}
</script>
```
This JavaScript makes the slideshow work:
- Hides all slides
- Shows the next slide
- Waits 4000 milliseconds (4 seconds)
- Repeats forever

---

## 📄 FILE 14: `supermarket/templates/products.html` ⭐ Most Important Template

```html
<!DOCTYPE html>
<html>
<head>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
</head>
<body>

<div>{% if msg %}<p>{{ msg }}</p>{% endif %}</div>

<h2>Products Table</h2>

<form action="#" method="post">
    {% csrf_token %}
    <label for="name">Product Name:</label><br>
    <input type="text" id="name" name="name"><br>
    <label for="price">Price:</label><br>
    <input type="text" id="price" name="price"><br>
    <label for="quantity">Quantity:</label><br>
    <input type="text" id="quantity" name="quantity"><br><br>
    <input type="submit" value="Submit">
</form>

<table>
  <tr>
    <th>Product Name</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>Actions</th>
  </tr>
{% for product in products %}
  <tr>
    <td>{{ product.name }}</td>
    <td>{{ product.price }}</td>
    <td>{{ product.quantity }}</td>
    <td>
        {% comment %} <a href="{% url 'product_update' product.id %}">Update</a> {% endcomment %}
        <a href="{% url 'product_delete' product.id %}">Delete</a>
    </td>
  </tr>
{% endfor %}
</table>

</body>
</html>
```

### CSS Section:
```css
table {
  border-collapse: collapse;
  width: 100%;
}
```
`border-collapse: collapse` = table borders merge into single lines (no double borders).
`width: 100%` = table takes full width of the page.

```css
tr:nth-child(even) {
  background-color: #dddddd;
}
```
Every EVEN row (2nd, 4th, 6th...) gets a grey background.
This makes the table easier to read (zebra stripes).

---

### Django Template Tags:

```html
{% if msg %}<p>{{ msg }}</p>{% endif %}
```
`{% if msg %}` = if the variable `msg` exists and is not empty.
`{{ msg }}` = print the value of `msg`.
`{% endif %}` = end the if block.

This is just like Python:
```python
if msg:
    print(msg)
```

When is `msg` set? In `views.py` after creating a product:
```python
return render(request, "products.html", {
    "products": products,
    'msg': f"Product {product.name} created successfully!"
})
```

---

```html
<form action="#" method="post">
```
`action="#"` = submit the form to the SAME URL (stay on the same page).
`method="post"` = use POST method (because we are sending data).

```html
    {% csrf_token %}
```
Django requires this in EVERY form that uses POST.
It inserts a hidden security token:
```html
<input type="hidden" name="csrfmiddlewaretoken" value="abc123...">
```
Django checks this token on every POST request.
If it is missing → Django rejects the form with an error!
This protects against Cross-Site Request Forgery attacks.

```html
    <input type="text" id="name" name="name">
```
`id="name"` = used by the `<label for="name">` to connect to this input.
`name="name"` = the key used to get the value in views.py: `request.POST.get("name")`.
These two must match!

---

```html
{% for product in products %}
  <tr>
    <td>{{ product.name }}</td>
    <td>{{ product.price }}</td>
    <td>{{ product.quantity }}</td>
  </tr>
{% endfor %}
```

`{% for product in products %}` = loop through every product in the list.
Exactly like Python: `for product in products:`
`{{ product.name }}` = print the product's name attribute.
`{% endfor %}` = end the for loop. (In Python we use indentation, in Django templates we use `{% endfor %}`)

---

```html
{% comment %} <a href="{% url 'product_update' product.id %}">Update</a> {% endcomment %}
```
`{% comment %}...{% endcomment %}` = everything inside is commented out (ignored).
The Update link is disabled — the instructor left it as a reference for future work.

```html
<a href="{% url 'product_delete' product.id %}">Delete</a>
```
`{% url 'product_delete' product.id %}` = generate the URL for deleting this product.

Django looks up the URL named `product_delete` in `urls.py`:
```python
path("products_delete/<int:id>/", product_delete, name="product_delete")
```
And fills in `product.id` for the `<int:id>` part.

**Example result:**
```
product.id = 3
{% url 'product_delete' product.id %} = /supermarket/products_delete/3/
```

So clicking "Delete" takes the user to `/supermarket/products_delete/3/` which calls `product_delete(request, id=3)` in views.py.

---

## 🔄 Complete Journey — One Full Example

Let us trace what happens when a user **adds a new product**:

```
1. User goes to: http://127.0.0.1:8000/supermarket/products/

2. iti/urls.py:
   sees "supermarket/" → passes "products/" to supermarket/urls.py

3. supermarket/urls.py:
   sees "products/" → calls products() in views.py

4. views.py → products(request):
   request.method = "GET"
   → Products.objects.all() → gets all products from database
   → render(request, "products.html", {"products": products})

5. products.html:
   → shows the form (empty)
   → shows all products in the table

6. User fills in: name="Apple", price="5.0", quantity="100"
   User clicks Submit

7. Browser sends POST request to same URL

8. views.py → products(request):
   request.method = "POST"
   → request.POST.get("name") = "Apple"
   → request.POST.get("price") = "5.0"
   → request.POST.get("quantity") = "100"
   → Products.objects.create(name="Apple", price="5.0", quantity="100")
   → saves to db.sqlite3
   → gets all products again (now includes Apple)
   → render with msg="Product Apple created successfully!"

9. products.html:
   → shows msg "Product Apple created successfully!"
   → shows all products including the new Apple

10. User sees the updated page with Apple in the table! ✅
```

---

## 📋 Summary Table — All Files at a Glance

| File | Purpose | Do you edit it? |
|------|---------|-----------------|
| `manage.py` | Remote control — run commands | Never |
| `db.sqlite3` | Database — stores all data | Never (Django manages it) |
| `req.txt` | List of required libraries | Add new libraries here |
| `iti/settings.py` | All project settings | Yes — add apps, configure database etc. |
| `iti/urls.py` | Main URL routing | Yes — add app URL includes |
| `supermarket/models.py` | Database table definitions | Yes — define your data structure |
| `supermarket/views.py` | Handle requests and responses | Yes — write your logic here |
| `supermarket/urls.py` | App URL routing | Yes — connect URLs to view functions |
| `supermarket/admin.py` | Register models in admin panel | Yes — add `admin.site.register()` |
| `supermarket/apps.py` | App configuration | Rarely |
| `supermarket/migrations/` | Database change history | Never (Django generates these) |
| `supermarket/templates/` | HTML files shown to users | Yes — design your pages here |
