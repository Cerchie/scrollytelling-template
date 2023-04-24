import React from 'react'
import logo from './logo.svg'
import './App.css'

import { useState, useEffect, useRef } from 'react'

interface SectionProps {
    bgColor: string
    content: JSX.Element
}

const App = () => {
    const [sections, setSections] = useState<SectionProps[]>([])

    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setSections([
            {
                bgColor: '#b784a7', // mauve
                content: (
                    <div style={{ height: window.innerHeight }}>
                        First section content goes here
                    </div>
                ),
            },
            {
                bgColor: '#98ddca', // mint green
                content: (
                    <div style={{ height: window.innerHeight }}>
                        Second section content goes here
                    </div>
                ),
            },
            {
                bgColor: '#f9e79f', // pastel yellow
                content: (
                    <div style={{ height: window.innerHeight }}>
                        Third section content goes here
                    </div>
                ),
            },
        ])
    }, [])

    const handleScroll = () => {
        const container = containerRef.current
        if (!container) {
            return
        }

        const scrollPosition = container.scrollTop
        const containerHeight = container.clientHeight

        const updatedSections = sections.map((section, index) => {
            const sectionHeight = containerHeight / sections.length
            const sectionTop = index * sectionHeight
            const sectionBottom = sectionTop + sectionHeight
            const isInView =
                scrollPosition >= sectionTop && scrollPosition < sectionBottom

            return {
                ...section,
                bgColor: isInView ? section.bgColor : 'transparent',
            }
        })

        setSections(updatedSections)
    }

    return (
        <div onScroll={handleScroll} ref={containerRef}>
            {sections.map((section, index) => (
                <div key={index} style={{ backgroundColor: section.bgColor }}>
                    {section.content}
                </div>
            ))}
        </div>
    )
}

export default App
