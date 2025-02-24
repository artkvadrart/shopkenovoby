import * as React from 'react';
import Typography from '@mui/material/Typography';
import {auth} from '@/auth';

import NavTabs from '@/components/nav-tabs';

export default async function Page() {

  const session = await auth();

return (
  <>
    {/* <AppProvider> */}
      <div className="flex justify-center"> <NavTabs active={1} /> </div>
      <Typography>Welcome to Toolpad, {session?.user?.name || 'xUser'}!</Typography>;
    {/* </AppProvider> */}
  </>
  )
}

// signIn={ ()=>{console.log("12345");}