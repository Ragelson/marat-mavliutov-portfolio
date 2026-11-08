import { Arrow } from '../../components/Arrow/Arrow.tsx'
import { ExternalLink } from '../../components/ExternalLink/ExternalLink.tsx'
import { Signature } from '../../components/Signature/Signature.tsx'
import { site } from '../../config/site.ts'
import { getContactLinks } from '../../lib/contacts.ts'
import styles from './ContactsSection.module.css'

const contactLinks = getContactLinks(site.contacts)

/** Финал страницы. Показываются только настроенные контакты, подписи честно называют канал. */
export function ContactsSection() {
  return (
    <section id="contacts" tabIndex={-1} className={`surface-accent ${styles.finale}`} aria-labelledby="contacts-title">
      <div className={`container ${styles.grid}`}>
        <p className="prompt" aria-hidden="true">
          ./contact.sh
        </p>
        <p className="label">Контакты</p>
        <h2 id="contacts-title" className={`glow ${styles.title}`}>
          Есть задача? Обсудим.
        </h2>
        <ul className={styles.list}>
          {contactLinks.map((contact) => {
            const content = (
              <>
                <span className={styles.channel}>{contact.label}</span>
                <span className={styles.address}>{contact.text}</span>
                <Arrow direction={contact.external ? 'up-right' : 'right'} />
              </>
            )
            return (
              <li key={contact.id}>
                {contact.external ? (
                  <ExternalLink href={contact.href} className={styles.link}>
                    {content}
                  </ExternalLink>
                ) : (
                  <a href={contact.href} className={styles.link}>
                    {content}
                  </a>
                )}
              </li>
            )
          })}
        </ul>
        <Signature />
      </div>
    </section>
  )
}
