/* ══════════════════════════════════════
   AUTH
 ══════════════════════════════════════ */
function switchAuthMode(mode) {
  const facultyTab = document.getElementById('tab-btn-faculty');
  const authorityTab = document.getElementById('tab-btn-authority');
  const facultyForm = document.getElementById('auth-form-faculty');
  const authorityForm = document.getElementById('auth-form-authority');

  if (facultyTab && authorityTab && facultyForm && authorityForm) {
    facultyTab.classList.toggle('active', mode === 'faculty');
    authorityTab.classList.toggle('active', mode === 'authority');
    facultyForm.classList.toggle('active', mode === 'faculty');
    authorityForm.classList.toggle('active', mode === 'authority');
  }
  
  if (window.initLucide) initLucide();
}

function toggleSignUp(show) {
  const tabs = document.querySelector('.auth-tabs');
  const facultyForm = document.getElementById('auth-form-faculty');
  const authorityForm = document.getElementById('auth-form-authority');
  const signupForm = document.getElementById('auth-form-signup');

  if (show) {
    if (tabs) tabs.style.display = 'none';
    if (facultyForm) facultyForm.classList.remove('active');
    if (authorityForm) authorityForm.classList.remove('active');
    if (signupForm) {
      signupForm.style.display = 'flex';
      signupForm.classList.add('active');
    }
  } else {
    if (tabs) tabs.style.display = 'flex';
    if (signupForm) {
      signupForm.style.display = 'none';
      signupForm.classList.remove('active');
    }
    switchAuthMode('faculty');
  }
}

async function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;
  const err = document.getElementById('login-error');
  
  if (!email || !pass) { 
    err.style.display = 'block'; 
    err.textContent = 'Please fill all fields.'; 
    return; 
  }
  
  err.style.display = 'none';

  try {
    const response = await fetch('http://localhost:8081/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password: pass })
    });

    if (response.ok) {
      const data = await response.json();
      S.token = data.token;
      localStorage.setItem('dsr_token', data.token);
      
      S.user = { 
        id: data.id,
        name: data.username.split('@')[0].replace(/\./g,' ').replace(/\b\w/g,c=>c.toUpperCase()), 
        email: data.username, 
        role: data.role 
      };
      S.role = data.role.toLowerCase();
      
      if (S.role === 'authority') showAuthorityScreen();
      else showAppScreen();
    } else {
      err.style.display = 'block'; 
      err.textContent = 'Invalid credentials. Please try again.';
    }
  } catch (error) {
    console.error('Login error:', error);
    err.style.display = 'block'; 
    err.textContent = 'Could not connect to the server.';
  }
}

function doAuthorityVerify() {
  const nicId = document.getElementById('auth-nic-id').value.trim();
  const pin = document.getElementById('auth-security-pin').value;
  const err = document.getElementById('auth-error');
  if (!nicId || !pin) {
    err.style.display = 'block';
    err.textContent = 'Please enter both NIC ID and Security PIN.';
    return;
  }
  err.style.display = 'none';
  // Demo Login verification - sets authority credentials
  S.user = { name: 'Dr. Suresh Verma', email: 'dmo@punjab.gov.in', role: 'authority' };
  S.role = 'authority';
  showAuthorityScreen();
}

function doAuthorityQuickLogin() {
  S.user = { name:'Dr. Suresh Verma', email:'dmo@punjab.gov.in', role:'authority' };
  S.role = 'authority';
  showAuthorityScreen();
}

function togglePinReveal() {
  const pinInput = document.getElementById('auth-security-pin');
  if (pinInput) {
    pinInput.type = pinInput.type === 'password' ? 'text' : 'password';
  }
}

async function doSignup() {
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const pass = document.getElementById('signup-pass').value;
  const role = document.getElementById('signup-role').value;
  const err = document.getElementById('signup-error');
  const ok = document.getElementById('signup-success');
  
  if (!name || !email || !pass) { 
    err.style.display = 'block'; 
    err.textContent = 'Please fill all required fields.'; 
    return; 
  }
  if (pass.length < 6) { 
    err.style.display = 'block'; 
    err.textContent = 'Password must be at least 6 characters.'; 
    return; 
  }
  
  err.style.display = 'none'; 
  ok.style.display = 'none';

  try {
    const response = await fetch('http://localhost:8081/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password: pass, role: role })
    });

    const data = await response.json();

    if (response.ok) {
      ok.style.display = 'block'; 
      ok.textContent = 'Account created! You can now log in.';
      setTimeout(() => switchAuthMode('faculty'), 1500);
    } else {
      err.style.display = 'block'; 
      err.textContent = data.message || 'Registration failed.';
    }
  } catch (error) {
    console.error('Signup error:', error);
    err.style.display = 'block'; 
    err.textContent = 'Could not connect to the server.';
  }
}

function doLogout() {
  S.user = null; 
  S.role = 'user';
  S.token = null;
  localStorage.removeItem('dsr_token');
  viewHistory = [];
  currentViewId = 'dashboard';
  const backBtn = document.getElementById('tb-back-btn');
  if (backBtn) backBtn.style.display = 'none';
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-auth').classList.add('active');
  switchAuthMode('faculty');
  if (typeof applyTheme === 'function') {
    applyTheme('light', false);
  }
  if (typeof updateDarkModeIcon === 'function') {
    updateDarkModeIcon();
  }
}

function showAppScreen() {
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-app').classList.add('active');
  if (typeof initThemeFromStorage === 'function') {
    initThemeFromStorage();
  }
  if (typeof updateDarkModeIcon === 'function') updateDarkModeIcon();
  const init = S.user.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase();
  document.getElementById('sb-avatar').textContent = init;
  document.getElementById('sb-uname').textContent = S.user.name;
  document.getElementById('sb-urole').textContent = S.role==='admin'?'System Admin':S.role==='reviewer'?'Section Reviewer':'Report Coordinator';
  initApp();
  if (window.initLucide) initLucide();
}

function showAuthorityScreen() {
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-authority').classList.add('active');
  document.getElementById('auth-user-label').textContent = S.user.name + ' · Authority';
  renderAuthorityReports();
  if (typeof initThemeFromStorage === 'function') {
    initThemeFromStorage();
  }
  if (typeof updateDarkModeIcon === 'function') updateDarkModeIcon();
  if (window.initLucide) initLucide();
}
