import { auth } from '@/auth'
import Nav from '../../components/common/nav'
import { signOutAction } from '../auth/_actions/sign-in'

async function Page() {
    const session = await auth()
    console.log('pageSession', session)
    return (
        <>
            <Nav />
            <main className="page-container max-w-sm flex-center">
                <form action={signOutAction}>
                    <button type="submit">SIGN OUT</button>
                </form>
            </main>
        </>
    )
}

export default Page
