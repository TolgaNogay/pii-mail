'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function KayitOlPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [emailPrefix, setEmailPrefix] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({
    length: true,
    uppercase: true,
    lowercase: true,
    number: true,
    special: true,
    match: true
  });
  const emailInputRef = useRef<HTMLInputElement>(null);

  // E-posta değiştiğinde prefix'i güncelle
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // @ işaretinden önceki kısmı al
    if (value.includes('@')) {
      setEmailPrefix(value.split('@')[0]);
    } else {
      setEmailPrefix(value);
    }
  };

  // Kullanıcı doğrudan prefix'i değiştirdiğinde
  const handlePrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailPrefix(value);
    setEmail(value + '@pii.email');
  };

  // Şifre değiştiğinde güvenlik kontrolü yap
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    checkPasswordStrength(value);
  };

  // Şifre tekrarı değiştiğinde eşleşme kontrolü yap
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordErrors(prev => ({
      ...prev,
      match: value !== password && value !== ""
    }));
  };

  // Şifre gücünü kontrol et
  const checkPasswordStrength = (password: string) => {
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    setPasswordErrors({
      length: !hasLength,
      uppercase: !hasUppercase,
      lowercase: !hasLowercase,
      number: !hasNumber,
      special: !hasSpecial,
      match: confirmPassword !== "" && confirmPassword !== password
    });

    // Şifre gücünü hesapla (0-100 arası)
    let strength = 0;
    if (hasLength) strength += 20;
    if (hasUppercase) strength += 20;
    if (hasLowercase) strength += 20;
    if (hasNumber) strength += 20;
    if (hasSpecial) strength += 20;
    
    setPasswordStrength(strength);
  };

  // Şifre gücü göstergesi rengi
  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return "bg-red-500";
    if (passwordStrength < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Şifre gücü metni
  const getPasswordStrengthText = () => {
    if (passwordStrength < 40) return "Zayıf";
    if (passwordStrength < 80) return "Orta";
    return "Güçlü";
  };

  // Form gönderildiğinde
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Şifre gereksinimleri karşılanıyor mu kontrol et
    const hasErrors = Object.values(passwordErrors).some(error => error);
    
    if (hasErrors) {
      alert("Lütfen tüm şifre gereksinimlerini karşılayın.");
      return;
    }
    
    // Form gönderme işlemleri burada yapılacak
    console.log("Form gönderildi", { name, email, password });
  };

  // Şifre görünürlüğünü değiştir
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Şifre tekrarı görünürlüğünü değiştir
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white font-[family-name:var(--font-geist-sans)] flex flex-col relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-full h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="p-4 relative z-10 backdrop-blur-sm bg-black/20">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-30 animate-pulse"></div>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white relative z-10">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">PiMail</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 relative z-10">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md bg-gray-900/50 backdrop-blur-md p-8 rounded-xl border border-gray-800 shadow-xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-white text-transparent bg-clip-text">Kayıt Ol</h1>
            <p className="text-gray-400">PiMail hesabı oluşturun</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Ad Soyad</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ad Soyad"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">E-posta</label>
              <div className="flex items-center w-full bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <input
                  id="emailPrefix"
                  type="text"
                  value={emailPrefix}
                  onChange={handlePrefixChange}
                  placeholder="ad"
                  className="flex-1 px-4 py-3 bg-transparent border-0 text-white placeholder-gray-500 focus:outline-none"
                  required
                  ref={emailInputRef}
                />
                <div className="bg-gray-700/50 px-3 py-3 text-gray-300 font-medium flex items-center">
                  @pii.email
                </div>
              </div>
              <input type="hidden" name="email" value={email} />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">Şifre</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
                  required
                />
                <button 
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Şifre gücü göstergesi */}
              {password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Şifre Gücü:</span>
                    <span className={`text-xs font-medium ${
                      passwordStrength < 40 ? "text-red-400" : 
                      passwordStrength < 80 ? "text-yellow-400" : 
                      "text-green-400"
                    }`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {/* Şifre gereksinimleri */}
              {(passwordFocus || password) && (
                <div className="mt-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <p className="text-xs text-gray-400 mb-2">Şifreniz şunları içermelidir:</p>
                  <ul className="space-y-1 text-xs">
                    <li className={`flex items-center ${passwordErrors.length ? "text-red-400" : "text-green-400"}`}>
                      <span className="mr-1">{passwordErrors.length ? "✕" : "✓"}</span> En az 8 karakter
                    </li>
                    <li className={`flex items-center ${passwordErrors.uppercase ? "text-red-400" : "text-green-400"}`}>
                      <span className="mr-1">{passwordErrors.uppercase ? "✕" : "✓"}</span> En az 1 büyük harf (A-Z)
                    </li>
                    <li className={`flex items-center ${passwordErrors.lowercase ? "text-red-400" : "text-green-400"}`}>
                      <span className="mr-1">{passwordErrors.lowercase ? "✕" : "✓"}</span> En az 1 küçük harf (a-z)
                    </li>
                    <li className={`flex items-center ${passwordErrors.number ? "text-red-400" : "text-green-400"}`}>
                      <span className="mr-1">{passwordErrors.number ? "✕" : "✓"}</span> En az 1 rakam (0-9)
                    </li>
                    <li className={`flex items-center ${passwordErrors.special ? "text-red-400" : "text-green-400"}`}>
                      <span className="mr-1">{passwordErrors.special ? "✕" : "✓"}</span> En az 1 özel karakter (!@#$%^&*)
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Şifre Tekrar</label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 bg-gray-800/50 border ${
                    confirmPassword && passwordErrors.match ? "border-red-500" : "border-gray-700"
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12`}
                  required
                />
                <button 
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
              {confirmPassword && passwordErrors.match && (
                <p className="text-xs text-red-400 mt-1">Şifreler eşleşmiyor</p>
              )}
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                <span>Kabul ediyorum </span>
                <Link href="/kullanim-kosullari" className="text-blue-400 hover:text-blue-300">Kullanım Koşulları</Link>
                <span> ve </span>
                <Link href="/gizlilik" className="text-blue-400 hover:text-blue-300">Gizlilik Politikası</Link>
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-lg text-white font-medium transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
            >
              Kayıt Ol
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Zaten hesabınız var mı? <Link href="/giris" className="text-blue-400 hover:text-blue-300">Giriş Yap</Link>
            </p>
          </div>
        </motion.div>
      </main>

      {/* Simple Footer */}
      <div className="relative z-10 py-4 text-xs text-gray-500 border-t border-gray-800/50 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>© 2025 PiMail Inc. — tüm hakları saklıdır.</div>
          <div className="flex space-x-4">
            <Link href="/kullanim-kosullari" className="text-gray-400 hover:text-white transition-colors">Kullanım Koşulları</Link>
            <Link href="/gizlilik" className="text-gray-400 hover:text-white transition-colors">Gizlilik ve Tanımlama Bilgileri</Link>
            <Link href="/yardim" className="text-gray-400 hover:text-white transition-colors">Yardım</Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 