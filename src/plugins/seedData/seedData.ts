import type { Config } from 'payload'
import sessions from '@/lib/data/sessions'

type PluginTypes = {
    enabled: boolean
}

export const seedDataPlugin = (pluginOptions: PluginTypes) =>
    (incomingConfig: Config): Config => {
        // create copy of incoming config
        const config = { ...incomingConfig }

        // If you wanted to add to the onInit:
        config.onInit = async payload => {
            if (incomingConfig.onInit) await incomingConfig.onInit(payload)
            
            // Add data seeding functionality here
            if (pluginOptions.enabled) {
                try {
                    console.log('🌱 Starting data seeding...')
                    
                    // Check if data already exists
                    const existingSessions = await payload.find({
                        collection: 'sessions',
                        limit: 1,
                    })
                    
                    const existingResources = await payload.find({
                        collection: 'resources',
                        limit: 1,
                    })
                    
                    if (existingSessions.docs.length > 0 || existingResources.docs.length > 0) {
                        console.log('📝 Data already exists, skipping seeding...')
                        return
                    }
                    
                    console.log('📚 Creating resources...')
                    const resourceMap = new Map()
                    
                    // Create all resources first
                    for (const session of sessions) {
                        for (const resource of session.resources) {
                            if (!resourceMap.has(resource.id)) {
                                const createdResource = await payload.create({
                                    collection: 'resources',
                                    data: {
                                        title: resource.title,
                                        description: resource.description,
                                        uri: resource.uri,
                                        tags: resource.tags.map((tag: string) => ({ tag })),
                                        type: resource.type,
                                    },
                                })
                                resourceMap.set(resource.id, createdResource.id)
                                console.log(`✅ Created resource: ${resource.title}`)
                            }
                        }
                    }
                    
                    console.log('🎯 Creating sessions...')
                    
                    // Create sessions with resource relationships
                    for (const session of sessions) {
                        const sessionResourceIds = session.resources.map((resource: any) => 
                            resourceMap.get(resource.id)
                        ).filter(Boolean)
                        
                        await payload.create({
                            collection: 'sessions',
                            data: {
                                title: session.title,
                                description: session.description,
                                topics: session.topics.map((topic: string) => ({ topic })),
                                date: session.date.toISOString().split('T')[0], // Convert Date to string
                                resources: sessionResourceIds,
                            },
                        })
                        console.log(`✅ Created session: ${session.title}`)
                    }
                    
                    console.log('🎉 Data seeding completed successfully!')
                    console.log(`📊 Created ${resourceMap.size} resources and ${sessions.length} sessions`)
                    
                } catch (error) {
                    console.error('❌ Error during data seeding:', error)
                }
            }
        }

        // Finally, return the modified config
        return config
    }
