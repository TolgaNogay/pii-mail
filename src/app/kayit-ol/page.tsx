'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { auth } from '@/lib/supabase';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [emailPrefix, setEmailPrefix] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+90"); // Varsayılan olarak Türkiye
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6 haneli OTP için
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Ülke kodları listesi
  const countryCodes = [
    { code: "+90", country: "Türkiye" },
    { code: "+1", country: "ABD/Kanada" },
    { code: "+44", country: "Birleşik Krallık" },
    { code: "+49", country: "Almanya" },
    { code: "+33", country: "Fransa" },
    { code: "+39", country: "İtalya" },
    { code: "+31", country: "Hollanda" },
    { code: "+34", country: "İspanya" },
    { code: "+46", country: "İsveç" },
    { code: "+47", country: "Norveç" },
    { code: "+45", country: "Danimarka" },
    { code: "+358", country: "Finlandiya" },
    { code: "+48", country: "Polonya" },
    { code: "+43", country: "Avusturya" },
    { code: "+41", country: "İsviçre" },
    { code: "+32", country: "Belçika" },
    { code: "+351", country: "Portekiz" },
    { code: "+30", country: "Yunanistan" },
    { code: "+420", country: "Çek Cumhuriyeti" },
    { code: "+36", country: "Macaristan" }
  ];

  // Kullanıcı giriş durumunu kontrol et
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await auth.getUser();
      if (user) {
        router.push('/gelenkutusu');
      }
    };
    checkAuth();
  }, [router]);

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

  // Yaş kontrolü
  const checkAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age >= 13;
  };

  // Telefon numarası formatı
  const formatPhoneNumber = (value: string) => {
    // Sadece rakamları al
    const numbers = value.replace(/\D/g, '');
    
    // Format: XXX XXX-XXXX
    if (numbers.length <= 10) {
      let formatted = numbers;
      if (numbers.length > 3) formatted = formatted.slice(0, 3) + ' ' + formatted.slice(3);
      if (numbers.length > 6) formatted = formatted.slice(0, 7) + '-' + formatted.slice(7);
      return formatted;
    }
    return value;
  };

  // Telefon numarası değiştiğinde
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  // OTP input referanslarını oluştur
  useEffect(() => {
    otpRefs.current = otpRefs.current.slice(0, 6);
  }, []);

  // OTP değişiklik handler'ı
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0]; // Sadece ilk karakteri al
    }
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Otomatik olarak sonraki input'a geç
    if (value !== '' && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  // OTP keydown handler'ı
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Boş input'ta backspace'e basılırsa önceki input'a git
      otpRefs.current[index - 1]?.focus();
    }
  };

  // OTP doğrulama fonksiyonu
  const verifyOtp = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setOtpError('Lütfen 6 haneli doğrulama kodunu girin.');
      return;
    }

    setIsVerifying(true);
    setOtpError(null);

    try {
      // Burada OTP doğrulama API'si çağrılacak
      // Şimdilik simüle ediyoruz
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Başarılı doğrulama
      setSuccess('Telefon doğrulaması başarılı! Gelen kutunuza yönlendiriliyorsunuz...');
      setTimeout(() => {
        router.push('/gelenkutusu');
      }, 2000);
    } catch (err) {
      setOtpError('Doğrulama kodu hatalı. Lütfen tekrar deneyin.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Sonraki adıma geç
  const handleNextStep = () => {
    if (currentStep === 1) {
      // İlk adım validasyonu: Ad Soyad ve Email
      if (!name || !emailPrefix) {
        setError('Lütfen ad soyad ve e-posta adresinizi girin.');
        return;
      }
      setError(null);
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // İkinci adım validasyonu: Telefon ve Doğum Tarihi
      if (!phone || !birthDate) {
        setError('Lütfen telefon numarası ve doğum tarihinizi girin.');
        return;
      }
      // Yaş kontrolü
      if (!checkAge(birthDate)) {
        setError('Üzgünüz, 13 yaşından küçükler kayıt olamaz.');
        return;
      }
      // Telefon numarası kontrolü
      const phoneDigits = phone.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        setError('Geçerli bir telefon numarası giriniz.');
        return;
      }
      setError(null);
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Şifre validasyonu
      if (!password || !confirmPassword) {
        setError('Lütfen şifrenizi girin ve onaylayın.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Şifreler eşleşmiyor.');
        return;
      }
      if (passwordStrength < 80) {
        setError('Lütfen daha güçlü bir şifre belirleyin.');
        return;
      }
      handleSignUp();
    } else if (currentStep === 4) {
      verifyOtp();
    }
  };

  // Önceki adıma dön
  const handlePrevStep = () => {
    setError(null);
    setCurrentStep(currentStep - 1);
  };

  // Form gönderildiğinde
  const handleSignUp = async () => {
    setError(null);
    setSuccess(null);

    try {
      setLoading(true);
      const { data, error: signUpError } = await auth.signUp(email, password);

      if (signUpError) {
        throw signUpError;
      }

      // Kayıt başarılı, OTP adımına geç
      setSuccess('Hesabınız oluşturuldu! Lütfen telefonunuza gönderilen kodu girin.');
      setCurrentStep(4);
    } catch (err: any) {
      console.error('Kayıt hatası:', err);
      if (err.message === 'User already registered') {
        setError('Bu e-posta adresi zaten kullanımda.');
      } else {
        setError(err.message || 'Kayıt sırasında bir hata oluştu.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Şifre görünürlüğünü değiştir
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Şifre tekrarı görünürlüğünü değiştir
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Enter tuşu kontrolü
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNextStep();
    }
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
              <Image 
                src="/images/logo.svg" 
                alt="Pii.Mail Logo" 
                width={28} 
                height={28} 
                className="relative z-10"
              />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Pii.Mail</span>
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
            <p className="text-gray-400">PiMail hesabı oluşturun.</p>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg p-4 mb-6 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-500 rounded-lg p-4 mb-6 text-sm">
              {success}
            </div>
          )}

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Adım 1: Ad Soyad ve Email */}
            {currentStep === 1 && (
              <>
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">Ad Soyad</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
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
                      onKeyDown={handleKeyDown}
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
              </>
            )}

            {/* Adım 2: Telefon ve Doğum Tarihi */}
            {currentStep === 2 && (
              <>
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Telefon Numarası</label>
                  <div className="flex gap-2 w-full">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-[140px] px-3 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.code} {country.country}
                        </option>
                      ))}
                    </select>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      onKeyDown={handleKeyDown}
                      placeholder="555 555-5555"
                      className="flex-1 min-w-0 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-400">Örnek: {countryCode} 555 555-5555</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="birthDate" className="block text-sm font-medium text-gray-300">Doğum Tarihi</label>
                  <input
                    id="birthDate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    onKeyDown={handleKeyDown}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <p className="text-xs text-gray-400">13 yaşından büyük olmalısınız</p>
                </div>
              </>
            )}

            {/* Adım 3: Şifre */}
            {currentStep === 3 && (
              <>
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">Şifre</label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      onKeyDown={handleKeyDown}
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
                      onKeyDown={handleKeyDown}
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
              </>
            )}

            {/* Adım 4: Telefon Doğrulama */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-200 mb-2">Telefon Doğrulama</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {countryCode} {phone} numaralı telefonunuza gönderilen 6 haneli kodu girin
                  </p>
                </div>

                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        if (el) {
                          otpRefs.current[index] = el;
                        }
                      }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => {
                        handleOtpKeyDown(index, e);
                        if (e.key === 'Enter' && otp.join('').length === 6) {
                          e.preventDefault();
                          verifyOtp();
                        }
                      }}
                      className="w-12 h-14 text-center text-xl font-bold bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  ))}
                </div>

                {otpError && (
                  <div className="text-center text-sm text-red-400">
                    {otpError}
                  </div>
                )}

                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-blue-400 hover:text-blue-300"
                    onClick={() => {
                      // Kodu tekrar gönder
                      setOtp(['', '', '', '', '', '']);
                      setOtpError(null);
                    }}
                  >
                    Kodu tekrar gönder
                  </button>
                </div>
              </div>
            )}

            {/* Adım Göstergesi */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <div className={`h-2 w-2 rounded-full ${currentStep >= 1 ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
                <div className={`h-2 w-2 rounded-full ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
                <div className={`h-2 w-2 rounded-full ${currentStep >= 3 ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
                <div className={`h-2 w-2 rounded-full ${currentStep >= 4 ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
              </div>
              <div className="text-sm text-gray-400">
                Adım {currentStep}/4
              </div>
            </div>

            {/* Butonlar */}
            <div className="flex gap-3">
              {currentStep > 1 && currentStep !== 4 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-800 transition-all"
                >
                  Geri
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
                >
                  İleri
                </button>
              ) : currentStep === 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 flex items-center justify-center"
                >
                  {loading ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  {loading ? 'İşleniyor...' : 'Hesap Oluştur'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={verifyOtp}
                  disabled={isVerifying}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 flex items-center justify-center"
                >
                  {isVerifying ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  {isVerifying ? 'Doğrulanıyor...' : 'Doğrula ve Tamamla'}
                </button>
              )}
            </div>
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