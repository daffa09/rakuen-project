<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="/img/logo.ico" />
        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        <meta name="description" content="Experienced programmer with over 4 years in web and software development.Offering IT consultancy services in Depok for business and services.">
        <meta name="keywords" content="programmer, artificial intelligence, AI, web development, software development, IT consultant, Depok, digital consultation, business consultation, services consultation">
        <meta name="author" content="Daffa Fathan">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
