import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { apiClient } from '@frontend_next/lib/eden'

export function withPermissionCheck(permission: string, gssp: GetServerSideProps) {
    return async (context: GetServerSidePropsContext) => {
        const { req } = context

        console.log('req.cookies', req.cookies)
        const token = req.cookies.token

        if (!token) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            }
        }

        try {

            const { data: userData } = await apiClient.api.users.my_permissions.get({
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (userData && Array.isArray(userData) && userData.includes(permission)) {
                // Call the original `getServerSideProps` function
                const gsspResult = await gssp(context)

                // Add the user data to the props
                if ('props' in gsspResult) {
                    return {
                        ...gsspResult,
                        props: {
                            ...gsspResult.props,
                            user: userData,
                        },
                    }
                }

                return gsspResult

            } else {
                return {
                    redirect: {
                        destination: '/has-no-permission',
                        permanent: false,
                    },
                }
            }

        } catch (error) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            }
        }
    }
}