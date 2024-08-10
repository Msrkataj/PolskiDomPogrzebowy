// import React, { useState } from 'react';
// import { db } from '../../../firebase';
// import { doc, getDoc } from 'firebase/firestore';
// import { useRouter } from 'next/router';
//
// const LoginForm = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const router = useRouter();
//
//     const handleLogin = async () => {
//         try {
//             const userRef = doc(db, 'forms', email);
//             const userSnap = await getDoc(userRef);
//             if (userSnap.exists()) {
//                 const userData = userSnap.data();
//                 if (userData.password === password) {
//                     localStorage.setItem('userRole', userData.role);
//                     localStorage.setItem('userEmail', email);
//                     localStorage.setItem('loginTimestamp', new Date().toISOString());
//                     switch (userData.role) {
//                         case 'client':
//                             router.push('/client/dashboard');
//                             break;
//                         case 'funeralHome':
//                             router.push('/funeralHome/dashboard');
//                             break;
//                         case 'admin':
//                             router.push('/admin/dashboard');
//                             break;
//                         default:
//                             setError('Nieznana rola użytkownika.');
//                     }
//                 } else {
//                     setError('Niepoprawne hasło.');
//                 }
//             } else {
//                 setError('Użytkownik nie istnieje.');
//             }
//         } catch (error) {
//             setError('Błąd logowania, spróbuj ponownie.');
//         }
//     };
//
//     return (
//         <div className="loginContainer">
//             <h2>Logowanie</h2>
//             <input
//                 type="email"
//                 placeholder="E-mail"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//                 type="password"
//                 placeholder="Hasło"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             {error && <p className="errorMessage">{error}</p>}
//             <button onClick={handleLogin}>Zaloguj</button>
//         </div>
//     );
// };
//
// export default LoginForm;