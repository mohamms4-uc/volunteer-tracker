import { PrivyProvider } from '@privy-io/react-auth';
import '../uclogo.png';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId='clx0v8lcw007x291oxp6g6j7g'
      config={{
        // Replace this with your desired login methods
        loginMethods: ['email', 'wallet'],
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
