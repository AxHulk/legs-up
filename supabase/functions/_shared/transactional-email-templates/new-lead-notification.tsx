import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Legs Up Studio'
const OWNER_EMAIL = 'nogivverh-fit@yandex.ru'

interface NewLeadProps {
  name?: string
  phone?: string
  question?: string
  submittedAt?: string
}

const NewLeadNotificationEmail = ({
  name,
  phone,
  question,
  submittedAt,
}: NewLeadProps) => (
  <Html lang="ru" dir="ltr">
    <Head />
    <Preview>Новая заявка с сайта{name ? ` от ${name}` : ''}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Новая заявка с сайта</Heading>
        <Text style={subtitle}>
          Клиент оставил заявку через форму «Остались вопросы?»
        </Text>

        <Section style={card}>
          <Row label="Имя" value={name || '—'} />
          <Row label="Телефон" value={phone || '—'} />
          {question ? <Row label="Вопрос" value={question} /> : null}
          {submittedAt ? <Row label="Дата" value={submittedAt} /> : null}
        </Section>

        <Hr style={hr} />
        <Text style={footer}>
          {SITE_NAME} · уведомление отправлено на {OWNER_EMAIL}
        </Text>
      </Container>
    </Body>
  </Html>
)

const Row = ({ label, value }: { label: string; value: string }) => (
  <Section style={{ marginBottom: '14px' }}>
    <Text style={rowLabel}>{label}</Text>
    <Text style={rowValue}>{value}</Text>
  </Section>
)

export const template = {
  component: NewLeadNotificationEmail,
  subject: (data: Record<string, any>) =>
    data?.name ? `Новая заявка: ${data.name}` : 'Новая заявка с сайта',
  to: OWNER_EMAIL,
  displayName: 'Уведомление о заявке с сайта',
  previewData: {
    name: 'Анна Иванова',
    phone: '+7 (915) 123-45-67',
    question: 'Хочу узнать про абонемент на 8 занятий',
    submittedAt: '25.05.2026 14:30',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#2a2a28',
  margin: '0 0 8px',
}
const subtitle = {
  fontSize: '14px',
  color: '#7a7a72',
  margin: '0 0 28px',
  lineHeight: '1.5',
}
const card = {
  backgroundColor: '#f7f4ee',
  borderRadius: '12px',
  padding: '24px',
  border: '1px solid #ece6da',
}
const rowLabel = {
  fontSize: '11px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: '#8a7d65',
  margin: '0 0 4px',
}
const rowValue = {
  fontSize: '15px',
  color: '#2a2a28',
  margin: '0',
  lineHeight: '1.5',
  whiteSpace: 'pre-wrap' as const,
}
const hr = { borderColor: '#ece6da', margin: '28px 0 16px' }
const footer = { fontSize: '12px', color: '#a39d92', margin: '0' }
