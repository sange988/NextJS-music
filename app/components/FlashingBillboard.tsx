import React from 'react';

interface FlashingBillboardProps {
  children: React.ReactNode;
}

const FlashingBillboard: React.FC<FlashingBillboardProps> = ({ children }) => {
  return (
    <div className="flashing-billboard">
      {children}
    </div>
  );
};

export default FlashingBillboard;