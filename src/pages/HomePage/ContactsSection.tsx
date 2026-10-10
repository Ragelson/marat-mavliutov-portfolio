import { ExternalLink } from '../../components/ExternalLink/ExternalLink.tsx'
import { site } from '../../config/site.ts'
import { getContactLinks } from '../../lib/contacts.ts'
import styles from './HomePage.module.css'

const contactLinks = getContactLinks(site.contacts)

export function ContactsSection() {
  return (
    <section id="contacts" tabIndex={-1} className={`container ${styles.section}`} aria-labelledby="contacts-title">
      <div className={styles.contacts}>
        <h2 id="contacts-title" className={styles.sectionTitle}>
          Контакты
        </h2>
        <p className={styles.lead}>Готов обсудить проект или работу.</p>
        <ul className={styles.contactList}>
          {contactLinks.map((contact, index) => {
            const className = index === 0 ? 'button button-primary' : 'button'
            return (
              <li key={contact.id}>
                {contact.external ? (
                  <ExternalLink href={contact.href} className={className}>
                    {contact.label}
                  </ExternalLink>
                ) : (
                  <a href={contact.href} className={className}>
                    {contact.label}
                  </a>
                )}
                <span className={styles.contactText}>{contact.text}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
