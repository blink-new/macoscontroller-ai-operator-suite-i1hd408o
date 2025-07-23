import { createClient } from '@blinkdotnew/sdk'

// Initialize Blink client for AI operations
export const blink = createClient({
  projectId: 'macoscontroller-ai-operator-suite-i1hd408o',
  authRequired: false // For demo purposes, we'll handle auth later
})

// AI Service for intelligent task processing
export class AIService {
  static async processUserRequest(message: string, attachments?: File[]): Promise<string> {
    try {
      // Handle file attachments first
      let fileContext = ''
      if (attachments && attachments.length > 0) {
        fileContext = await this.processAttachments(attachments)
      }

      // Determine the type of task based on the message
      const taskType = this.analyzeTaskType(message)
      
      // Generate intelligent response based on task type and context
      const response = await this.generateIntelligentResponse(message, fileContext, taskType)
      
      return response
    } catch (error) {
      console.error('AI Service Error:', error)
      return "I encountered an error processing your request. Please try again or contact support if the issue persists."
    }
  }

  static async processAttachments(attachments: File[]): Promise<string> {
    let context = ''
    
    for (const file of attachments) {
      try {
        if (file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
          // Read text files directly
          const text = await file.text()
          context += `\n\n--- Content of ${file.name} ---\n${text}\n--- End of ${file.name} ---\n`
        } else if (file.type.startsWith('image/')) {
          // For images, we'll describe what we can process
          context += `\n\n--- Image File: ${file.name} (${this.formatFileSize(file.size)}) ---\nImage file detected. I can analyze this image for content, text extraction, or visual elements.\n`
        } else {
          // For other file types, provide basic info
          context += `\n\n--- File: ${file.name} (${file.type}, ${this.formatFileSize(file.size)}) ---\nFile detected. I can help process this file based on its type and your specific requirements.\n`
        }
      } catch (error) {
        context += `\n\n--- Error processing ${file.name} ---\nUnable to read file content. Please ensure the file is accessible and try again.\n`
      }
    }
    
    return context
  }

  static analyzeTaskType(message: string): string {
    const lowerMessage = message.toLowerCase()
    
    // Audio/Music tasks
    if (lowerMessage.includes('music') || lowerMessage.includes('audio') || lowerMessage.includes('song') || lowerMessage.includes('sound')) {
      return 'audio'
    }
    
    // Video/Film tasks
    if (lowerMessage.includes('video') || lowerMessage.includes('film') || lowerMessage.includes('movie') || lowerMessage.includes('edit')) {
      return 'video'
    }
    
    // Writing tasks
    if (lowerMessage.includes('write') || lowerMessage.includes('article') || lowerMessage.includes('blog') || lowerMessage.includes('content')) {
      return 'writing'
    }
    
    // Design tasks
    if (lowerMessage.includes('design') || lowerMessage.includes('image') || lowerMessage.includes('logo') || lowerMessage.includes('graphic')) {
      return 'design'
    }
    
    // Business tasks
    if (lowerMessage.includes('business') || lowerMessage.includes('manage') || lowerMessage.includes('plan') || lowerMessage.includes('strategy')) {
      return 'business'
    }
    
    // Legal tasks
    if (lowerMessage.includes('legal') || lowerMessage.includes('contract') || lowerMessage.includes('law') || lowerMessage.includes('agreement')) {
      return 'legal'
    }
    
    // File processing tasks
    if (lowerMessage.includes('summarize') || lowerMessage.includes('analyze') || lowerMessage.includes('extract') || lowerMessage.includes('process')) {
      return 'analysis'
    }
    
    return 'general'
  }

  static async generateIntelligentResponse(message: string, fileContext: string, taskType: string): Promise<string> {
    try {
      // First try to use Blink AI
      const systemPrompt = `You are MacController, an advanced AI operator and assistant. You are part of a comprehensive AI suite capable of handling audio production, film editing, writing, design, business management, legal tasks, and more.

Your role is to:
1. Understand the user's specific request
2. Analyze any attached files or context
3. Provide actionable, detailed responses
4. Delegate to appropriate AI models/tools when needed
5. Give specific next steps or deliverables

Current task type: ${taskType}
User message: ${message}
${fileContext ? `File context: ${fileContext}` : ''}

Respond as MacController with specific, actionable guidance. If files were attached, process them according to the user's request. Be direct, helpful, and professional.`

      // Use Blink AI to generate intelligent response with timeout
      const response = await Promise.race([
        blink.ai.generateText({
          prompt: systemPrompt,
          model: 'gpt-4o-mini',
          maxTokens: 1000
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('AI service timeout')), 15000)
        )
      ]) as { text: string };

      return response.text
    } catch (error) {
      console.error('Error generating AI response:', error)
      
      // Always fallback to task-specific responses
      return this.getFallbackResponse(message, taskType, fileContext)
    }
  }

  static getFallbackResponse(message: string, taskType: string, fileContext: string): string {
    const hasFiles = fileContext.length > 0
    
    switch (taskType) {
      case 'analysis':
        if (hasFiles) {
          return `I've received your files and understand you want me to ${message.toLowerCase()}. 

Based on the attached files, I can help you with:
• Document analysis and summarization
• Content extraction and processing
• Data analysis and insights
• File format conversion

${fileContext}

What specific analysis would you like me to perform on these files?`
        }
        break
        
      case 'audio':
        return `I understand you want to work on audio/music production. As MacController, I can help with:

• Music generation and composition
• Audio editing and mixing
• Spatial audio and Dolby Atmos mixing
• Voice cloning and synthesis
• Audio analysis and processing

What specific audio task would you like me to handle?`
        
      case 'video':
        return `I'm ready to assist with your video/film project. I can help with:

• Video editing and post-production
• AI-generated footage and scenes
• Color grading and visual effects
• Audio synchronization
• Format conversion and optimization

What aspect of video production do you need help with?`
        
      case 'writing':
        return `I'm prepared to help with your writing project. My capabilities include:

• Content creation and copywriting
• Article and blog writing
• Script and screenplay development
• Technical documentation
• SEO optimization and marketing content

What type of writing project are you working on?`
        
      case 'design':
        return `I'm ready to assist with your design project. I can help with:

• Logo and brand design
• Marketing materials and graphics
• UI/UX design concepts
• Image generation and editing
• 3D rendering and visualization

What design elements do you need created?`
        
      case 'business':
        return `I'm prepared to help with your business needs. I can assist with:

• Business planning and strategy
• Project management and organization
• Financial analysis and budgeting
• Marketing and growth strategies
• Process automation and optimization

What business challenge can I help you solve?`
        
      case 'legal':
        return `I'm ready to assist with your legal requirements. I can help with:

• Contract drafting and review
• Legal document preparation
• Compliance and regulatory guidance
• Intellectual property protection
• Business formation and structure

What legal matter do you need assistance with?`
        
      default:
        if (hasFiles) {
          return `I've received your files and I'm ready to help process them according to your needs.

${fileContext}

Please let me know specifically what you'd like me to do with these files, and I'll provide detailed assistance.`
        }
        
        return `I understand you need assistance with: "${message}"

As MacController, I'm equipped to handle a wide range of tasks including:
• Audio and music production
• Video editing and creation
• Writing and content development
• Design and graphics
• Business management
• Legal documentation

Could you provide more specific details about what you'd like me to accomplish?`
    }
    
    return "I'm ready to help! Please provide more details about your specific requirements."
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
}