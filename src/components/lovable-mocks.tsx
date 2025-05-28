'use client';

import React from 'react';
// Este é um componente mock para o LovableProvider
export const LovableProvider = ({ children }) => {
  return <>{children}</>;
};
// Este é um componente mock para o EditorScript
export const EditorScript = () => {
  return null;
// Este é um componente mock para o Editable
export const Editable = ({ id, children }) => {
  return <div data-lovable-id={id}>{children}</div>;
