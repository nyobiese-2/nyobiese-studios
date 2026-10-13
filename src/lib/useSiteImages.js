import { useEffect, useState } from 'react'
import { supabase } from './supabase'

/* Returns an object like { 'home-artist': 'https://...', ... }.
   Slots with no upload are simply missing, so pages fall back to their placeholder. */
export default function useSiteImages() {
  const [images, setImages] = useState({})

  useEffect(() => {
    let alive = true

    supabase
      .from('site_images')
      .select('slot, image_url')
      .then(({ data, error }) => {
        if (!alive || error || !data) return
        const map = {}
        data.forEach(r => { map[r.slot] = r.image_url })
        setImages(map)
      })

    return () => { alive = false }
  }, [])

  return images
}
