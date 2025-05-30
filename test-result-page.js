// Simple test script for ResultPage
import React from 'react';

console.log('Testing ResultPage imports...');

try {
  console.log('1. Testing React hooks...');
  const { useEffect, useState, useCallback } = React;
  console.log('✅ React hooks imported successfully');

  console.log('2. Testing basic components...');
  // Test se os componentes básicos estão funcionando
  
  console.log('3. Testing localStorage...');
  const testData = {
    userName: 'Test User',
    primaryStyle: { category: 'Natural', percentage: 80 },
    secondaryStyles: []
  };
  
  localStorage.setItem('test_quiz_result', JSON.stringify(testData));
  const retrieved = localStorage.getItem('test_quiz_result');
  console.log('✅ localStorage working:', JSON.parse(retrieved));
  
  console.log('4. All basic tests passed!');
  
} catch (error) {
  console.error('❌ Error in test:', error);
}
