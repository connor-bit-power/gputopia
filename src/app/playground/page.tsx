'use client'
import { Metadata } from 'next'
import React, { useState, useEffect } from 'react';
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





export default function PlaygroundPage() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const [isCodeInterpreterOn, setIsCodeInterpreterOn] = useState(false);
  const [isRetrievalOn, setIsRetrievalOn] = useState(false);

  const handleAgentSelect = (value: string) => {
    const agent = agents.find((a) => a.name === value);
    setSelectedAgent(agent || null);
    const hasCodeInterpreter = agent?.tools.includes('code_interpreter');
    setIsCodeInterpreterOn(!!hasCodeInterpreter);
    const hasRetrieval = agent?.tools.includes('retrieval');
    setIsRetrievalOn(!!hasRetrieval);
  };

  // Handle current message
  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMessage(event.target.value);
  };

  // Handle message submit
  const handleSubmit = () => {
    if (currentMessage.trim()) {
      // Log the current message to the console
      console.log(currentMessage);
      // Add new message to the messages list
      setMessages(prevMessages => [...prevMessages, currentMessage]);
      // Clear the current message input
      setCurrentMessage('');
    }

    useEffect(() => {
      // Check if the selected agent has 'code_interpreter' in its tools array
      const hasCodeInterpreter = selectedAgent?.tools.includes('code_interpreter');
      setIsCodeInterpreterOn(!!hasCodeInterpreter);
    }, [selectedAgent]);
  };

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
                <H2>Agent</H2>
                <Select onValueChange={handleAgentSelect}>
                  <SelectTrigger className="w-[350px] h-[60px]">
                    <SelectValue placeholder="Select an agent" />
                  </SelectTrigger>
                  <SelectContent>
                  <SelectItem key="create-new-agent" value="create-new-agent" className="flex items-center gap-2">
                    <PlusIcon className="h-7 w-5 inline-block"/>
                    <span className="inline-block">Create New Agent</span>
                  </SelectItem>
                    {agents.map((agent, index) => (
                      <SelectItem key={agent.id} value={agent.name}>
                        {agent.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <H2>Name</H2>
                <Input placeholder="Enter a suer friendly name..." 
                value={selectedAgent?.name || ''}/>
                <H2>Instructions</H2>
                <Textarea  
                  style={{ height: '100px' }} 
                  placeholder="You are a helpful agent..."
                  value={selectedAgent?.instructions || ''}/>
                <ModelSelector types={types} models={models} />
                <Card className="w-[350px] h-[265px]">
                      <CardHeader>
                        <CardTitle>Tools</CardTitle>
                      </CardHeader>
                      <CardContent>
                      <div className="flex w-full space-x-2 mb-3">
                        <span className="flex-grow">Functions</span>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                           <PlusIcon className="h-7 w-5"/>
                          </HoverCardTrigger>
                          < HoverCardContent className="w-80">
                           <Textarea style={{ height: '100px' }} placeholder="You are a helpful agent..."/>
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                      <Separator className="flex w-full space-x-2 mb-3"/>
                      <div className="flex w-full space-x-2 mb-3">
                        <span className="flex-grow">Code interpreter</span>
                        <Switch checked={isCodeInterpreterOn} onCheckedChange={(checked) => {
                          setIsCodeInterpreterOn(checked);
                        }} />
                      </div>
                      <Separator className="flex w-full space-x-2 mb-3"/>
                      <div className="flex w-full space-x-2 mb-3">
                        <span className="flex-grow">Retrieval</span>
                        <Switch checked={isRetrievalOn} onCheckedChange={setIsRetrievalOn} />
                      </div>
                      <Separator className="flex w-full space-x-2 mb-3"/>
                      <div className="flex w-full space-x-2 mb-2">
                        <span className="flex-grow">Files</span>
                        <UploadIcon className="h-7 w-5" />
                      </div>
                      </CardContent>
                    </Card>
                <Button className="w-30">Save</Button>
              </div>

              
              <div className="md:order-2">
                <TabsContent value="complete" className="mt-0 border-0 p-0">
                  <div className="flex h-full flex-col space-y-4">
                    <Card placeholder="Write a tagline for an ice cream shop"
                      className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]">
                      <CardHeader  className="p-2">
                        <CardTitle><H3>Results</H3></CardTitle>
                        <div className="ml-auto flex w-full space-x-2 sm:justify-end">
                        <Button className="text-black border border-white" onClick={handleSubmit}>
                          Run
                        </Button>
                        <Button className="text-black border border-white">Clear</Button>
                       </div>
                      </CardHeader>
                   <CardContent className="overflow-y-auto" style={{ height: '600px' }}> {/* Set maxHeight to enable scrolling */}
                     {messages.map((message, index) => (
                      <React.Fragment key={index}>
                      <H3>You</H3>
                      <div className="w-full text-left">{message}</div>
                      <Separator className="flex w-full space-x-2 mb-3" />
                      </React.Fragment>
                      ))}
                    </CardContent>
                   </Card>
                    <div className="flex items-center space-x-2">
                    <Input 
                      style={{ height: '70px' }} 
                      placeholder="Enter your message..." 
                      value={currentMessage}
                      onChange={handleMessageChange}/>
                    <Button onClick={handleSubmit}>Submit</Button>
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
                </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
