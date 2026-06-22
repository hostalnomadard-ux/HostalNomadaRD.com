import { parsePost, readingTime } from '@/lib/blog'

const RAW = `---
title: 'Título de prueba'
description: 'Descripción de prueba para el post.'
keywordPrimary: 'keyword prueba'
keywords: ['kw1', 'kw2']
date: '2026-06-20'
audience: 'both'
hub: true
related: ['otro-post']
faq:
  - pregunta: '¿Pregunta?'
    respuesta: 'Respuesta.'
---

Cuerpo del artículo con varias palabras para medir el tiempo de lectura.
`

describe('parsePost', () => {
  it('parsea frontmatter requerido y aplica defaults', () => {
    const { meta, content } = parsePost(RAW, 'post-prueba')
    expect(meta.slug).toBe('post-prueba')
    expect(meta.title).toBe('Título de prueba')
    expect(meta.keywords).toEqual(['kw1', 'kw2'])
    expect(meta.audience).toBe('both')
    expect(meta.hub).toBe(true)
    expect(meta.updated).toBe('2026-06-20') // default = date
    expect(meta.ogImage).toBe('/images/fachada-esquina.png') // default
    expect(meta.faq[0].pregunta).toBe('¿Pregunta?')
    expect(meta.readingMinutes).toBeGreaterThanOrEqual(1)
    expect(content).toContain('Cuerpo del artículo')
  })

  it('coacciona date tipo Date de YAML a string ISO', () => {
    const raw = RAW.replace("date: '2026-06-20'", 'date: 2026-06-20')
    const { meta } = parsePost(raw, 'x')
    expect(meta.date).toBe('2026-06-20')
  })

  it('lanza error si falta un campo requerido', () => {
    const raw = RAW.replace("title: 'Título de prueba'", '')
    expect(() => parsePost(raw, 'malo')).toThrow(/title/)
  })
})

describe('readingTime', () => {
  it('devuelve al menos 1 minuto', () => {
    expect(readingTime('una sola palabra')).toBe(1)
  })
  it('calcula ~200 palabras por minuto', () => {
    const text = Array(400).fill('palabra').join(' ')
    expect(readingTime(text)).toBe(2)
  })
})
