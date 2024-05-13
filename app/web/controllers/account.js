document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const lottieAnimationLogin = document.getElementById('lottie-animation-login');
    const lottieAnimationSignup = document.getElementById('lottie-animation-signup');

    function showAnimationThenReload(animationElement) {
        animationElement.style.display = 'block'; // Show the animation
        setTimeout(() => {
            animationElement.style.display = 'none'; // Hide the animation after 3000 ms (3 seconds)
            window.location.reload(); // Reload the page or redirect as necessary
        }, 3000);
    }

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new URLSearchParams(new FormData(loginForm));
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData.toString()
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  showAnimationThenReload(lottieAnimationLogin); // Show login animation on success
              } else {
                  alert('Login failed: ' + data.message);
              }
          }).catch(error => {
              alert('Login failed: ' + (error.message || 'Server error'));
          });
    });

    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new URLSearchParams(new FormData(signupForm));
        fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData.toString()
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  showAnimationThenReload(lottieAnimationSignup); // Show signup animation on success
              } else {
                  alert('Signup failed: ' + data.message);
              }
          }).catch(error => {
              alert('Signup failed: ' + (error.message || 'Server error'));
          });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    checkLoginStatus();

    function checkLoginStatus() {
        fetch('/is-authenticated')
            .then(response => response.json())
            .then(data => {
                updateNavbar(data.isAuthenticated);
            })
            .catch(error => console.error('Error checking authentication status:', error));
    }

    function updateNavbar(isAuthenticated) {
        const navRightSide = document.getElementById('navbarRightSide');

        if (isAuthenticated) {
            navRightSide.innerHTML = `
                <li class="nav-item">
                    <a id="info-btn" class="nav-link" href="art_collection" role="button">
                        <span id="line">Buy</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a id="info-btn" class="nav-link" href="upload" role="button">
                        <span id="line">Sell</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a id="account-btn" class="nav-link" href="#" role="button" onclick="toggleAccountOptions()">
                        <span id="line">Account</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a id="cart-btn" class="nav-link" href="cart" role="button">
                        <span id="line">Cart</span>
                    </a>
                </li>
            `;
        } else {
            navRightSide.innerHTML = `
                <li class="nav-item">
                    <a id="user-btn" class="nav-link" href="#" role="button" data-bs-toggle="modal" data-bs-target="#modalId">
                        <span id="line">Login</span>
                    </a>
                </li>
            `;
        }
    }

    window.toggleAccountOptions = function() {
        const accountOptions = document.getElementById('account-options');
        if (!accountOptions) {
            const newHtml = `
                <div id="account-options" class="dropdown-menu show">
                    <a class="dropdown-item" href="/profile">Profile</a>
                    <a class="dropdown-item" href="#" onclick="logout()">Logout</a>
                </div>
            `;
            document.getElementById('account-btn').parentNode.insertAdjacentHTML('beforeend', newHtml);
        } else {
            accountOptions.classList.toggle('show');
        }
    };

    window.logout = function() {
        fetch('/logout')
            .then(() => {
                alert('Logged out successfully!');
                checkLoginStatus(); 
            })
            .catch(error => {
                console.error('Failed to log out:', error);
                alert('Logout failed!');
            });
    };
});
