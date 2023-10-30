<template>
    <footer class="footer">
        <section class="sponsor-section">
            <div class="sponsor-group">
                <a v-for="number in 15" :key="number" :class="'sponsor-image sponsor-' + number"></a>
            </div>
        </section>
        <section class="info-section">
            <div class="copyright">
                <p>
                    &copy; 2023 Todos los derechos reservados.
                </p>
                <p>
                    <a href="#">Condiciones de uso</a>
                </p>
                <p>
                    <a href="#">Politica de cookies</a>
                </p>
            </div>
            <div class="social-icons">
                <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-facebook"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-youtube"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-twitch"></i></a>
            </div>
        </section>
    </footer>
</template>