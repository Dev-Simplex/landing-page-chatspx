"use client"

import { useEffect, useState } from "react"

export function SiteLoader() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return
    
    const handleLoad = () => setIsLoaded(true)

    if (document.readyState === "complete") {
      handleLoad()
      return
    }

    window.addEventListener("load", handleLoad)
    return () => window.removeEventListener("load", handleLoad)
  }, [])

  useEffect(() => {
    if (typeof document === "undefined") return
    
    const root = document.documentElement
    const body = document.body

    if (!isLoaded) {
      root.classList.add("is-loading")
      body.classList.add("is-loading")
      return
    }

    root.classList.remove("is-loading")
    body.classList.remove("is-loading")
  }, [isLoaded])

  return (
    <div
      className={`site-loader ${isLoaded ? "site-loader--hidden" : ""}`}
      role="status"
      aria-live="polite"
      aria-busy={!isLoaded}
    >
      <span className="sr-only">Loading</span>
      <div className="dank-ass-loader">
        <div className="row">
          <div className="arrow up outer outer-18" />
          <div className="arrow down outer outer-17" />
          <div className="arrow up outer outer-16" />
          <div className="arrow down outer outer-15" />
          <div className="arrow up outer outer-14" />
        </div>
        <div className="row">
          <div className="arrow up outer outer-1" />
          <div className="arrow down outer outer-2" />
          <div className="arrow up inner inner-6" />
          <div className="arrow down inner inner-5" />
          <div className="arrow up inner inner-4" />
          <div className="arrow down outer outer-13" />
          <div className="arrow up outer outer-12" />
        </div>
        <div className="row">
          <div className="arrow down outer outer-3" />
          <div className="arrow up outer outer-4" />
          <div className="arrow down inner inner-1" />
          <div className="arrow up inner inner-2" />
          <div className="arrow down inner inner-3" />
          <div className="arrow up outer outer-11" />
          <div className="arrow down outer outer-10" />
        </div>
        <div className="row">
          <div className="arrow down outer outer-5" />
          <div className="arrow up outer outer-6" />
          <div className="arrow down outer outer-7" />
          <div className="arrow up outer outer-8" />
          <div className="arrow down outer outer-9" />
        </div>
      </div>
    </div>
  )
}
