import { Metadata } from 'next'
import { useState } from 'react'
import Image from 'next/image'
import { CounterClockwiseClockIcon, RocketIcon, PlusIcon, UploadIcon} from '@radix-ui/react-icons'
import { Switch } from "@/components/ui/switch"
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ExternalLink,
  TypographyH1 as H1,
  TypographyH2 as H2,
  TypographyH3 as H3,
  TypographyP as P
} from '@/components/ui/typography'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { CodeViewer } from './components/code-viewer'
import { MaxLengthSelector } from './components/maxlength-selector'
import { ModelSelector } from './components/model-selector'
import { PresetActions } from './components/preset-actions'
import { PresetSave } from './components/preset-save'
import { PresetSelector } from './components/preset-selector'
import { PresetShare } from './components/preset-share'
import { Input } from "@/components/ui/input"
import { TopPSelector } from './components/top-p-selector'
import { models, types } from './data/models'
import { agents} from './data/agents'
import { presets } from './data/presets'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export const metadata: Metadata = {
  title: 'Playground',
  description: 'The OpenAI Playground built using the components.'
}

export default function PlaygroundPage() {
  return (
    <div className="mt-20 mx-8">
      <div className="h-full flex-col flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-6 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <H1 className="text-lg font-semibold my-50px">Playground</H1>
        </div>
        <Separator />
        <Tabs defaultValue="complete" className="flex-1">
          <div className="container h-full py-6">
            <div className="grid h-full items-stretch gap-6 md:grid-cols-[350px_1fr]">
              <div className="hidden flex-col space-y-4 sm:flex md:order-1">
                <div className="grid gap-2">
                </div>
                <Select>
                  <SelectTrigger className="w-[350px] h-[60px]">
                    <SelectValue placeholder="Select an agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {agents.map((agent, index) => (
                      <SelectItem key={agent.id} value={agent.name}>
                        {agent.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <H2>Name</H2>
                <Input placeholder="Enter a suer friendly name..." />
                <H2>Instructions</H2>
                <Textarea  
                style={{ height: '150px' }} 
                placeholder="You are a helpful agent..." />
                <ModelSelector types={types} models={models} />
                <Card className="w-[350px] h-[265px]">
                      <CardHeader>
                        <CardTitle>Tools</CardTitle>
                      </CardHeader>
                      <CardContent>
                      <div className="flex w-full space-x-2 mb-3">
                        <span className="flex-grow">Functions</span>
                        <PlusIcon className="h-7 w-5"/>
                      </div>
                      <Separator className="flex w-full space-x-2 mb-3"/>
                      <div className="flex w-full space-x-2 mb-3">
                        <span className="flex-grow">Code interpreter</span>
                        <Switch />
                      </div>
                      <Separator className="flex w-full space-x-2 mb-3"/>
                      <div className="flex w-full space-x-2 mb-3">
                        <span className="flex-grow">Retrieval</span>
                        <Switch />
                      </div>
                      <Separator className="flex w-full space-x-2 mb-3"/>
                      <div className="flex w-full space-x-2 mb-2">
                        <span className="flex-grow">Files</span>
                        <UploadIcon className="h-7 w-5" />
                      </div>
                      </CardContent>
                    </Card>
              </div>
              <div className="md:order-2">
                <TabsContent value="complete" className="mt-0 border-0 p-0">
                  <div className="flex h-full flex-col space-y-4">
                    <Card placeholder="Write a tagline for an ice cream shop"
                      className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]">
                      <CardHeader  className="p-2">
                        <CardTitle>Results</CardTitle>
                        <div className="ml-auto flex w-full space-x-2 sm:justify-end">
                        <Button class="text-white border border-white">Run</Button>
                        <Button class="text-white border border-white">Clear</Button>
                       </div>
                      </CardHeader>
                      <CardContent>
                        <p></p>
                      </CardContent>
                    </Card>
                    <div className="flex items-center space-x-2">
                    <Input placeholder="Enter your message..." />
                      <Button>Submit</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="insert" className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                      <Textarea
                        placeholder="We're writing to [inset]. Congrats from GPUtopia!"
                        className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px]"
                      />
                      <div className="rounded-md border bg-muted"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button>Submit</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="edit" className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <div className="grid h-full gap-6 lg:grid-cols-2">
                      <div className="flex flex-col space-y-4">
                        <div className="flex flex-1 flex-col space-y-2">
                          <Label htmlFor="input">Input</Label>
                          <Textarea
                            id="input"
                            placeholder="We is going to the market."
                            className="flex-1 lg:min-h-[580px]"
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="instructions">Instructions</Label>
                          <Textarea id="instructions" placeholder="Fix the grammar." />
                        </div>
                      </div>
                      <div className="mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[700px]" />
                    </div>
                    <div className="flex items-center space-x-2">
                      
                      <Button>Submit</Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
