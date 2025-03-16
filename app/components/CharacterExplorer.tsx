import { Card, CardContent } from '@/components/ui/card'
import { ApolloProvider } from './ApolloProvider'
import CharacterList from './CharacterList'

const CharacterExplorer = () => {
  return (
    <ApolloProvider>
        <Card className='mb-6'>
            <CardContent>
                <div className='grid gap-6 md:grid-cols-2'>

                </div>
            </CardContent>
        </Card>
        <CharacterList />
    </ApolloProvider>
  )
}

export default CharacterExplorer