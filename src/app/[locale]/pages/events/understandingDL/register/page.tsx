'use client';
import React, { useState, useRef } from "react";
import Button from "@/src/app/[locale]/components/Button";
import { FiInfo } from 'react-icons/fi';
import { FaChevronDown } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { createPortal } from "react-dom";

interface FormData {
  fullName: string;
  email: string;
  mobileNumber: string;
  telegramHandle: string;
  uspNumber: string;
}

interface Errors {
  fullName?: string;
  email?: string;
  mobileNumber?: string;
  telegramHandle?: string;
  uspNumber?: string;
}

const RegisterUDL = () => {
  const t = useTranslations('RegisterUDL');
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    mobileNumber: "",
    telegramHandle: "",
    uspNumber: ""
  });
  const [errors, setErrors] = useState<Errors>({});
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [termsModalOpen, setTermsModalOpen] = useState<boolean>(false);
  const [isEventOpen, setIsEventOpen] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const validateEmail = (email: string): boolean => {
    return email.includes('@');
  };

  const formatMobileNumber = (value: string): string => {
    let cleaned = value.replace(/\D/g, '').slice(0, 11);
    if (cleaned.length > 2 && cleaned.length <= 7) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else if (cleaned.length > 7) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    } else if (cleaned.length > 0) {
      return `(${cleaned}`;
    }
    return cleaned;
  };

  const validateMobileNumber = (number: string): boolean => {
    return number.replace(/\D/g, '').length === 11;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'mobileNumber') {
      const formattedNumber = formatMobileNumber(value);
      setFormData({ ...formData, [name]: formattedNumber });
      if (!validateMobileNumber(formattedNumber)) {
        setErrors({ ...errors, mobileNumber: t('InvalidMobileNumber') });
      } else {
        const newErrors = { ...errors };
        delete newErrors.mobileNumber;
        setErrors(newErrors);
      }
    } else if (name === 'email') {
      setFormData({ ...formData, [name]: value });
      if (!validateEmail(value)) {
        setErrors({ ...errors, email: t('InvalidEmail') });
      } else {
        const newErrors = { ...errors };
        delete newErrors.email;
        setErrors(newErrors);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEventOpen) {
      setModalMessage(t('EventNotOpen'));
      setModalOpen(true);
      return;
    }
    if (Object.keys(errors).length > 0) {
      alert(t('FixErrorsAlert'));
      return;
    }
    const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdvdy60e-goUArq_-kQ_17sSl4efH2CuvwdwLvrPOrAfkeA1g/formResponse";
    const formDataGoogle = new FormData();
    formDataGoogle.append("entry.1890799965", formData.fullName);
    formDataGoogle.append("entry.1794263189", formData.email);
    formDataGoogle.append("entry.1439406422", formData.mobileNumber);
    formDataGoogle.append("entry.400789290", formData.telegramHandle);
    formDataGoogle.append("entry.2125679188", formData.uspNumber);

    try {
      await fetch(formUrl, { method: "POST", body: formDataGoogle, mode: "no-cors" });
      setModalMessage(t('FormSuccess'));
      setFormData({
        fullName: "",
        email: "",
        mobileNumber: "",
        telegramHandle: "",
        uspNumber: ""
      });
    } catch {
      setModalMessage(t('FormError'));
    } finally {
      setModalOpen(true);
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleTermsModal = () => {
    setTermsModalOpen(!termsModalOpen);
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-md mx-auto mt-32">
      <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: "var(--primary)" }}>{t('RegisterForEvent')}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-5">
          <label htmlFor="fullName" className="block mb-2 text-sm font-medium" style={{ color: "var(--primary)" }}>{t('FullName')} *</label>
          <input type="text" name="fullName" id="fullName" required onChange={handleChange} value={formData.fullName} className="shadow-sm bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5" style={{ borderColor: errors.fullName ? 'red' : "var(--secondary)", backgroundColor: "var(--background-secondary)", color: "var(--primary)" }} />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium" style={{ color: "var(--primary)" }}>{t('Email')} *</label>
          <input type="email" name="email" id="email" required onChange={handleChange} value={formData.email} className="shadow-sm bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5" style={{ borderColor: errors.email ? 'red' : "var(--secondary)", backgroundColor: "var(--background-secondary)", color: "var(--primary)" }} />
          {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>}
        </div>
        <div className="mb-5">
          <label htmlFor="mobileNumber" className="block mb-2 text-sm font-medium" style={{ color: "var(--primary)" }}>{t('MobileNumber')} *</label>
          <input type="tel" name="mobileNumber" id="mobileNumber" required onChange={handleChange} value={formData.mobileNumber} maxLength={15} className="shadow-sm bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5" style={{ borderColor: errors.mobileNumber ? 'red' : "var(--secondary)", backgroundColor: "var(--background-secondary)", color: "var(--primary)" }} />
          {errors.mobileNumber && <p style={{ color: 'red', fontSize: '12px' }}>{errors.mobileNumber}</p>}
        </div>
        <div className="mb-5">
          <label htmlFor="telegramHandle" className="block mb-2 text-sm font-medium" style={{ color: "var(--primary)" }}>{t('TelegramHandle')} ({t('Optional')})</label>
          <input type="text" name="telegramHandle" id="telegramHandle" onChange={handleChange} value={formData.telegramHandle} className="shadow-sm bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5" style={{ borderColor: "var(--secondary)", backgroundColor: "var(--background-secondary)", color: "var(--primary)" }} />
        </div>
        <div className="mb-5">
          <label htmlFor="uspNumber" className="block mb-2 text-sm font-medium items-center" style={{ color: "var(--primary)" }}>{t('USPNumber')} ({t('Optional')})</label>
          <input type="text" name="uspNumber" id="uspNumber" onChange={handleChange} value={formData.uspNumber} className="shadow-sm bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5" style={{ borderColor: "var(--secondary)", backgroundColor: "var(--background-secondary)", color: "var(--primary)" }} />
        </div>
        <div className="flex items-center mb-5">
          <input id="terms" type="checkbox" className="w-4 h-4 rounded focus:ring-3" required style={{ backgroundColor: "var(--background-secondary)", borderColor: "var(--secondary)" }} />
          <label htmlFor="terms" className="ml-2 text-sm font-medium" style={{ color: "var(--primary)" }}>{t('AgreeTerms')} <a href="#" style={{ color: "var(--link)" }} onClick={toggleTermsModal}>{t('TermsAndConditions')}</a></label>
        </div>
        <Button variant="primary" size="medium" type="submit">{t('RegisterButton')}</Button>
      </form>
      {modalOpen && createPortal(<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"><div className="bg-white p-5 border shadow-lg rounded-md max-w-sm max-h-[500px] w-full overflow-y-auto relative" style={{ backgroundColor: "var(--background)", borderColor: "var(--secondary)" }}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-medium" style={{ color: "var(--primary)" }}>{modalMessage}</h3><button onClick={toggleModal} className="text-[var(--primary)] hover:text-[var(--secondary)] transition duration-300 ease-in-out">X</button></div><div ref={bottomRef} className="flex justify-center px-4 py-3"><Button variant="primary" onClick={toggleModal}>{t('AgreeAndClose')}</Button></div></div></div>, document.body)}
    </div>
  );
};

export default RegisterUDL;
