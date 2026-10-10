import { useEffect, useRef, type RefObject } from 'react'
import { useLocation, useNavigationType } from 'react-router'

const MAX_WAIT_FRAMES = 30

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Ждёт появления элемента с нужным id (ограниченное число кадров), затем вызывает callback. */
function whenElementAppears(id: string, callback: (element: HTMLElement) => void): void {
  let frame = 0

  const check = () => {
    const element = document.getElementById(id)
    if (element) {
      callback(element)
    } else if (frame < MAX_WAIT_FRAMES) {
      frame += 1
      requestAnimationFrame(check)
    }
  }
  check()
}

/**
 * Прокрутка и фокус при смене адреса.
 * BrowserRouter сам этого не делает, поэтому:
 * - «Назад/Вперёд» — возвращаем сохранённую позицию прокрутки;
 * - переход на якорь (/#projects) — ждём секцию, прокручиваем к ней и переводим на неё фокус;
 * - переход на новую страницу — прокручиваем наверх и фокусируем <main>,
 *   чтобы клавиатура и скринридер начинали с нового содержимого.
 */
export function useRouteScroll(mainRef: RefObject<HTMLElement | null>) {
  const location = useLocation()
  const navigationType = useNavigationType()
  const positions = useRef(new Map<string, number>())
  const handledKey = useRef<string | null>(null)
  const previousPathname = useRef<string | null>(null)

  // Браузер не должен восстанавливать прокрутку сам — иначе он конфликтует с этим хуком
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])

  // Запоминаем позицию прокрутки для текущей записи истории
  useEffect(() => {
    const key = location.key
    const save = () => positions.current.set(key, window.scrollY)
    window.addEventListener('scroll', save, { passive: true })
    return () => window.removeEventListener('scroll', save)
  }, [location.key])

  useEffect(() => {
    // В режиме разработки StrictMode запускает эффект дважды — второй запуск пропускаем
    if (handledKey.current === location.key) return
    const isFirstRender = handledKey.current === null
    handledKey.current = location.key
    const isSamePage = previousPathname.current === location.pathname
    previousPathname.current = location.pathname

    if (navigationType === 'POP') {
      const saved = positions.current.get(location.key)
      if (saved !== undefined) {
        window.scrollTo({ top: saved, behavior: 'instant' })
        return
      }
    }

    const id = decodeURIComponent(location.hash.slice(1))
    if (id) {
      whenElementAppears(id, (element) => {
        const smooth = isSamePage && !prefersReducedMotion()
        element.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant', block: 'start' })
        if (!isFirstRender) element.focus({ preventScroll: true })
      })
      return
    }

    if (isFirstRender) return
    window.scrollTo({ top: 0, behavior: 'instant' })
    mainRef.current?.focus({ preventScroll: true })
  }, [location.key, location.pathname, location.hash, navigationType, mainRef])
}
