import React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';

export function AccountCreated({ username, loginURL }) {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Preview>Your account has been created successfully!</Preview>
      <Body
        style={{
          backgroundColor: '#f4f6f8',
          fontFamily: `'Manrope', sans-serif`,
          padding: '40px 0',
        }}
      >
        <Container
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Logo */}
          <Section
            style={{
              textAlign: 'center',
              padding: '32px 0 20px',
            }}
          >
            <Img
              src="https://i.imgur.com/oYiTqum.png"
              width="60"
              height="60"
              alt="Workshop Logo"
              style={{ objectFit: 'contain', margin: '0 auto' }}
            />
          </Section>

          {/* Message */}
          <Section style={{ padding: '0 40px' }}>
            <Heading
              style={{
                fontSize: '22px',
                fontWeight: 600,
                color: '#202124',
                marginBottom: '16px',
              }}
            >
              Hello {username},
            </Heading>

            <Text
              style={{
                fontSize: '15px',
                lineHeight: '1.6',
                color: '#4a4a4a',
                marginBottom: '24px',
              }}
            >
              Your account has been successfully created on the Workshop Booking platform.
              You can now explore and register for available workshops based on your interests.
            </Text>

            {/* Login Button */}
            <Section style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Button
                href={loginURL} // ✅ Replace with your actual login URL
                style={{
                  backgroundColor: '#0070f3',
                  color: '#fff',
                  padding: '12px 20px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                Log In to Your Account
              </Button>
            </Section>

            <Text
              style={{
                fontSize: '14px',
                color: '#777',
                lineHeight: '1.6',
              }}
            >
              If you didn’t create this account, please ignore this message or contact our support team.
            </Text>
          </Section>

          <Hr style={{ borderColor: '#ececec', margin: '40px 0' }} />

          {/* Footer */}
          <Section
            style={{
              padding: '0 40px 32px',
              fontSize: '13px',
              color: '#777',
              lineHeight: '1.6',
              textAlign: 'center',
            }}
          >
            <Text>
              Need help? Email us at{' '}
              <a
                href="mailto:support@workshop-booking.com"
                style={{ color: '#0070f3', textDecoration: 'underline' }}
              >
                support@workshop-booking.com
              </a>
              .
            </Text>

            <Text style={{ marginTop: '24px', fontSize: '12px', color: '#aaa' }}>
              © {new Date().getFullYear()} Workshop Booking. All rights reserved.
              <br />
              Addis Ababa, Ethiopia
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
