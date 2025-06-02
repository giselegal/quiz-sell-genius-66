/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

import React from 'react'; // Adicionado import do React
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App Routes', () => {
  it('renders QuizFlow at root path', () => {
    window.history.pushState({}, 'Test page', '/')
    render(<App />)
    expect(screen.getByText(/Carregando quiz.../i)).toBeInTheDocument()
  })

  it('renders ResultPage at /resultado path', () => {
    window.history.pushState({}, 'Test page', '/resultado')
    render(<App />)
    expect(screen.getByText(/Carregando resultados.../i)).toBeInTheDocument()
  })

  it('renders ResultPage at /resultado/:id path', () => {
    window.history.pushState({}, 'Test page', '/resultado/some-id')
    render(<App />)
    expect(screen.getByText(/Carregando resultados.../i)).toBeInTheDocument()
  })

  it('renders AdminLayout at /admin path', () => {
    window.history.pushState({}, 'Test page', '/admin')
    render(<App />)
    expect(screen.getByText(/Carregando painel.../i)).toBeInTheDocument()
  })

  it('renders EditorPage at /admin/editor path', () => {
    window.history.pushState({}, 'Test page', '/admin/editor')
    render(<App />)
    expect(screen.getByText(/Carregando editor.../i)).toBeInTheDocument()
  })

  it('renders EditorPage at /admin/editor/:id path', () => {
    window.history.pushState({}, 'Test page', '/admin/editor/some-id')
    render(<App />)
    expect(screen.getByText(/Carregando editor.../i)).toBeInTheDocument()
  })

  it('redirects to root path for non-existent routes', () => {
    window.history.pushState({}, 'Test page', '/non-existent-route')
    render(<App />)
    expect(screen.getByText(/Carregando quiz.../i)).toBeInTheDocument()
  })
})
