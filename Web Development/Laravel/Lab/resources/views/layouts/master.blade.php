<!DOCTYPE html>
<html>

<head>
    <title>
        @yield('title', 'Ahmed Blog')
    </title>
    @vite('resources/css/app.css')
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-6 text-gray-800 text-center">Ahmed Blog</h1>
        @yield('content')
    </div>
</body>

</html>
