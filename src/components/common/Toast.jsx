import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';

export default function Toast() {
  const { toast } = useRealEstate();

  if (!toast.visible) return null;

  const renderIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 size={16} color="var(--accent-gold)" />;
      case 'warn':
        return <AlertCircle size={16} color="#E59866" />;
      default:
        return <Info size={16} color="var(--text-secondary)" />;
    }
  };

  return (
    <div className={`toast-notification toast-${toast.type}`} role="alert" aria-live="polite">
      {renderIcon()}
      <span className="toast-message">{toast.message}</span>
    </div>
  );
}
