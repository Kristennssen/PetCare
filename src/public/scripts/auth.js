document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  
  loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      

      const submitButton = loginForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      
      const correo = document.getElementById('correo').value.trim();
      const contrasena = document.getElementById('contrasena').value;
      

      if (!correo || !contrasena) {
          alert('Por favor, complete todos los campos');
          submitButton.disabled = false;
          return;
      }

      try {
          const response = await fetch('http://localhost:3030/api/auth/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ correo, contrasena }),
              credentials: 'include'
          });
          
          const data = await response.json();
          
          if (!response.ok) {
              throw new Error(data.message || 'Credenciales inválidas');
          }
          
          // Guarda el token
          localStorage.setItem('token', data.token);
          
          try {
              window.location.replace('pages/dashboard.html');
          } catch (redirectError) {
              window.location.assign('pages/dashboard.html');

              if (!window.location.assign) {
                  window.location.href = 'pages/dashboard.html';
              }
          }
          
      } catch (error) {
          console.error('Error en el inicio de sesión:', error);
          alert('Error: ' + (error.message || 'No se pudo iniciar sesión'));
      } finally {
          submitButton.disabled = false;
      }
  });
});