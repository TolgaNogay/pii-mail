'use client';

import { useState } from 'react';
import { signUp } from '@/lib/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Username için özel işlem
    if (name === 'username') {
      // Sadece küçük harf, rakam ve tire karakterlerine izin ver
      const formattedValue = value.toLowerCase().replace(/[^a-z0-9\-]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.fullName) return 'Ad Soyad gerekli';
    if (!formData.username) return 'Kullanıcı adı gerekli';
    if (formData.username.length < 3) return 'Kullanıcı adı en az 3 karakter olmalı';
    if (formData.username.length > 30) return 'Kullanıcı adı en fazla 30 karakter olmalı';
    if (!/^[a-z0-9][a-z0-9\-]*[a-z0-9]$/.test(formData.username)) 
      return 'Kullanıcı adı sadece küçük harf, rakam ve tire içerebilir';
    if (!formData.email) return 'E-posta adresi gerekli';
    if (!formData.password) return 'Şifre gerekli';
    if (formData.password.length < 8) return 'Şifre en az 8 karakter olmalı';
    if (formData.password !== formData.confirmPassword) return 'Şifreler eşleşmiyor';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    try {
      await signUp(formData.email, formData.password, formData.fullName, formData.username);
      router.push('/auth/verify-email');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          name="fullName"
          placeholder="Ad Soyad"
          value={formData.fullName}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div>
        <div className="relative">
          <Input
            type="text"
            name="username"
            placeholder="Kullanıcı adı"
            value={formData.username}
            onChange={handleChange}
            disabled={isLoading}
            className="pr-20"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            @pii.email
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Bu, sizin PiMail adresiniz olacak: {formData.username}@pii.email
        </p>
      </div>

      <div>
        <Input
          type="email"
          name="email"
          placeholder="Mevcut E-posta Adresiniz"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
        />
        <p className="mt-1 text-xs text-gray-500">
          Doğrulama için kullanılacak
        </p>
      </div>

      <div>
        <Input
          type="password"
          name="password"
          placeholder="Şifre"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Şifre (Tekrar)"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      {error && (
        <div className="text-sm text-red-500">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Kaydediliyor...' : 'Kayıt Ol'}
      </Button>
    </form>
  );
} 