import { PrivyProvider } from '@privy-io/react-auth';
import '../uclogo.png';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId='clyi1e71v0ipenhmnj9ojedxb'
      config={{
        // Replace this with your desired login methods
        loginMethods: ['email', 'wallet', 'google'],
        // Replace this with your desired appearance configuration
        appearance: {
          theme: 'light',
          accentColor: '#red',
          logo: '../uclogo.png',
          landingHeader: 'Volunteer Tracker',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
          noPromptOnSignature: true
        }
      }}
    >
      {children}
    </PrivyProvider>
  );
}
