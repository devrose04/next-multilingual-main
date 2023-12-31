import { Layout } from '@/components/layout/Layout'
import { NextPage } from 'next'
import Link from 'next-multilingual/link'
import { getTitle, useMessages } from 'next-multilingual/messages'
import { useLocalizedUrl } from 'next-multilingual/url'
import router, { useRouter } from 'next/router'
import { useState } from 'react'
import styles from './index.module.css'

const DynamicRoutesIdentifierTests: NextPage = () => {
  const messages = useMessages()
  const { asPath } = useRouter()
  const title = getTitle(messages)

  const [parameter, setParameter] = useState('123')

  const localizedUrl = useLocalizedUrl(`${asPath}/${parameter}`)

  return (
    <Layout title={title}>
      <h1 className={styles.headline}>{title}</h1>
      <p>{messages.format('details')}</p>
      <p>
        {messages.formatJsx('intro', {
          url: localizedUrl,
          code: <code className={styles.code}></code>,
        })}
      </p>
      <div className={styles.parameter}>
        <label>
          {messages.format('parameterLabel')}
          <input
            type="text"
            value={parameter}
            id="parameter-input"
            onChange={(event) => setParameter(event.target.value)}
          ></input>
        </label>
      </div>
      <ul>
        <li>
          <Link id="link-with-parameter" href={`${asPath}/${parameter}`}>
            {messages.format('link1Text')}
          </Link>{' '}
        </li>
        <li>
          <button id="route-push-button" onClick={() => router.push(localizedUrl)}>
            {messages.format('link2Text')}
          </button>
        </li>
      </ul>
      <p>{messages.format('instructions')}</p>
    </Layout>
  )
}

export default DynamicRoutesIdentifierTests
