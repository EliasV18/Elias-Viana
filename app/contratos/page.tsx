"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/hooks/use-toast"
import {
  Plus,
  Search,
  FileText,
  DollarSign,
  Calendar,
  User,
  Edit,
  MoreHorizontal,
  Eye,
  Download,
  AlertCircle,
  Copy,
  FileEdit,
  Save,
  Phone,
  Mail,
  MapPin,
  Building,
  Heart,
  GraduationCap,
  Users,
} from "lucide-react"

interface Client {
  id: number
  name: string
  email: string
  phone: string
  address: string
  city: string
  type: "pessoa_fisica" | "pessoa_juridica"
  category: "casamento" | "aniversario_15" | "aniversario" | "corporativo" | "outro"
  status: "ativo" | "inativo" | "prospecto"
  registrationDate: string
  notes?: string
}

interface Contract {
  id: number
  clientId: number
  client: string
  eventName: string
  eventDate: string
  totalValue: number
  paidValue: number
  remainingValue: number
  installments: number
  paymentMethod: "cartao_credito" | "pix" | "boleto" | "transferencia"
  status: "ativo" | "pago" | "atrasado" | "cancelado" | "orcamento"
  createdAt: string
  dueDate: string
  description?: string
  eventType?: "casamento" | "aniversario_15" | "aniversario" | "corporativo" | "outro"
  buffetType?: string
  venue?: string
  guests?: number
}

interface GeneratedContract {
  id: string
  contractId: number
  clientId: number
  templateId: string
  templateName: string
  client: string
  eventName: string
  content: string
  fields: Record<string, string>
  createdAt: string
  updatedAt: string
  version: number
  status: "rascunho" | "finalizado" | "assinado"
  type: "contrato" | "orcamento"
}

interface ContractTemplate {
  id: string
  name: string
  eventType: string
  template: string
  fields: {
    key: string
    label: string
    type: "text" | "number" | "date" | "select" | "cpf"
    options?: string[]
    required: boolean
  }[]
}

const contractTemplates: ContractTemplate[] = [
  {
    id: "casamento",
    name: "Contrato de Casamento",
    eventType: "casamento",
    template: `CONTRATO DE PRESTAÇÃO DE SERVIÇOS PARA CASAMENTO

São partes do presente instrumento:

{{nomeNoivo}}, portador do documento {{cpfNoivo}}, residente e domiciliado em {{enderecoNoivo}}, doravante denominado CONTRATANTE, e {{nomeNoiva}}, portadora do documento {{cpfNoiva}}, residente e domiciliada em {{enderecoNoiva}}, também CONTRATANTE, e de outro lado

{{nomeEmpresa}}, CNPJ nº {{cnpjEmpresa}}, doravante denominada CONTRATADA.

DO OBJETO DO CONTRATO:

CLÁUSULA 1ª: O presente instrumento tem por objeto a prestação de serviços pela CONTRATADA para realização do evento de casamento dos CONTRATANTES, conforme especificações abaixo:

Data do Evento: {{dataEvento}}
Local: {{localEvento}}
Número de Convidados: {{numeroConvidados}}
Tipo de Buffet: {{tipoBuffet}}

CLÁUSULA 2ª: Os serviços contratados compreendem:
- {{servicosInclusos}}

CLÁUSULA 3ª: O valor total dos serviços é de R$ {{valorTotal}}, a ser pago em {{numeroParcelas}} parcelas de R$ {{valorParcela}} cada, com vencimento {{formaVencimento}}.

CLÁUSULA 4ª: A CONTRATADA se compromete a executar os serviços com qualidade e pontualidade, seguindo todas as especificações acordadas.

Local e Data: {{localContrato}}, {{dataContrato}}

_________________________                    _________________________
{{nomeNoivo}}                                {{nomeNoiva}}
CONTRATANTE                                  CONTRATANTE

_________________________
{{nomeEmpresa}}
CONTRATADA`,
    fields: [
      { key: "nomeNoivo", label: "Nome do Noivo", type: "text", required: true },
      { key: "cpfNoivo", label: "CPF do Noivo", type: "cpf", required: true },
      { key: "enderecoNoivo", label: "Endereço do Noivo", type: "text", required: true },
      { key: "nomeNoiva", label: "Nome da Noiva", type: "text", required: true },
      { key: "cpfNoiva", label: "CPF da Noiva", type: "cpf", required: true },
      { key: "enderecoNoiva", label: "Endereço da Noiva", type: "text", required: true },
      { key: "dataEvento", label: "Data do Evento", type: "date", required: true },
      { key: "localEvento", label: "Local do Evento", type: "text", required: true },
      { key: "numeroConvidados", label: "Número de Convidados", type: "number", required: true },
      {
        key: "tipoBuffet",
        label: "Tipo de Buffet",
        type: "select",
        options: ["Buffet Completo", "Buffet Executivo", "Buffet Premium", "Coquetel"],
        required: true,
      },
      { key: "servicosInclusos", label: "Serviços Inclusos", type: "text", required: true },
      { key: "valorTotal", label: "Valor Total", type: "text", required: true },
      { key: "numeroParcelas", label: "Número de Parcelas", type: "number", required: true },
      { key: "valorParcela", label: "Valor da Parcela", type: "text", required: true },
      { key: "formaVencimento", label: "Forma de Vencimento", type: "text", required: true },
    ],
  },
  {
    id: "aniversario_15",
    name: "Contrato de Festa de 15 Anos",
    eventType: "aniversario_15",
    template: `CONTRATO DE PRESTAÇÃO DE SERVIÇOS PARA FESTA DE 15 ANOS

São partes do presente instrumento:

{{nomeAniversariante}}, menor impúbere, representada por {{nomeResponsavel}}, portador do documento {{cpfResponsavel}}, residente e domiciliado em {{enderecoResponsavel}}, doravante denominado CONTRATANTE, e de outro lado

{{nomeEmpresa}}, CNPJ nº {{cnpjEmpresa}}, doravante denominada CONTRATADA.

DO OBJETO DO CONTRATO:

CLÁUSULA 1ª: O presente instrumento tem por objeto a prestação de serviços pela CONTRATADA para realização da festa de 15 anos da menor {{nomeAniversariante}}, conforme especificações abaixo:

Data da Festa: {{dataEvento}}
Local: {{localEvento}}
Número de Convidados: {{numeroConvidados}}
Tema da Festa: {{temaFesta}}
Tipo de Buffet: {{tipoBuffet}}

CLÁUSULA 2ª: Os serviços contratados compreendem:
- {{servicosInclusos}}

CLÁUSULA 3ª: O valor total dos serviços é de R$ {{valorTotal}}, a ser pago em {{numeroParcelas}} parcelas de R$ {{valorParcela}} cada.

CLÁUSULA 4ª: A CONTRATADA se compromete a executar os serviços com qualidade, seguindo o tema escolhido e todas as especificações acordadas.

Local e Data: {{localContrato}}, {{dataContrato}}

_________________________                    _________________________
{{nomeResponsavel}}                          {{nomeEmpresa}}
CONTRATANTE                                  CONTRATADA`,
    fields: [
      { key: "nomeAniversariante", label: "Nome da Aniversariante", type: "text", required: true },
      { key: "nomeResponsavel", label: "Nome do Responsável", type: "text", required: true },
      { key: "cpfResponsavel", label: "CPF do Responsável", type: "cpf", required: true },
      { key: "enderecoResponsavel", label: "Endereço do Responsável", type: "text", required: true },
      { key: "dataEvento", label: "Data da Festa", type: "date", required: true },
      { key: "localEvento", label: "Local da Festa", type: "text", required: true },
      { key: "numeroConvidados", label: "Número de Convidados", type: "number", required: true },
      {
        key: "temaFesta",
        label: "Tema da Festa",
        type: "select",
        options: ["Jardim Encantado", "Princesa", "Paris", "Vintage", "Moderno", "Outro"],
        required: true,
      },
      {
        key: "tipoBuffet",
        label: "Tipo de Buffet",
        type: "select",
        options: ["Buffet Jovem", "Buffet Completo", "Buffet Premium", "Coquetel"],
        required: true,
      },
      { key: "servicosInclusos", label: "Serviços Inclusos", type: "text", required: true },
      { key: "valorTotal", label: "Valor Total", type: "text", required: true },
      { key: "numeroParcelas", label: "Número de Parcelas", type: "number", required: true },
      { key: "valorParcela", label: "Valor da Parcela", type: "text", required: true },
    ],
  },
  {
    id: "orcamento",
    name: "Orçamento",
    eventType: "orcamento",
    template: `ORÇAMENTO DE SERVIÇOS

Cliente: {{nomeCliente}}
Contato: {{telefoneCliente}} | {{emailCliente}}
Endereço: {{enderecoCliente}}

EVENTO: {{tipoEvento}}
Data: {{dataEvento}}
Local: {{localEvento}}
Número de Convidados: {{numeroConvidados}}

SERVIÇOS INCLUSOS:
{{servicosInclusos}}

VALORES:
{{detalhamentoValores}}

VALOR TOTAL: R$ {{valorTotal}}

Condições de Pagamento: {{condicoesPagamento}}

Validade da Proposta: {{validadeProposta}}

Observações: {{observacoes}}

{{nomeEmpresa}}
{{telefoneEmpresa}} | {{emailEmpresa}}`,
    fields: [
      { key: "nomeCliente", label: "Nome do Cliente", type: "text", required: true },
      { key: "telefoneCliente", label: "Telefone do Cliente", type: "text", required: true },
      { key: "emailCliente", label: "Email do Cliente", type: "text", required: true },
      { key: "enderecoCliente", label: "Endereço do Cliente", type: "text", required: true },
      {
        key: "tipoEvento",
        label: "Tipo de Evento",
        type: "select",
        options: ["Casamento", "Aniversário 15 Anos", "Aniversário", "Corporativo", "Outro"],
        required: true,
      },
      { key: "dataEvento", label: "Data do Evento", type: "date", required: true },
      { key: "localEvento", label: "Local do Evento", type: "text", required: true },
      { key: "numeroConvidados", label: "Número de Convidados", type: "number", required: true },
      { key: "servicosInclusos", label: "Serviços Inclusos", type: "text", required: true },
      { key: "detalhamentoValores", label: "Detalhamento dos Valores", type: "text", required: true },
      { key: "valorTotal", label: "Valor Total", type: "text", required: true },
      { key: "condicoesPagamento", label: "Condições de Pagamento", type: "text", required: true },
      { key: "validadeProposta", label: "Validade da Proposta", type: "text", required: true },
      { key: "observacoes", label: "Observações", type: "text", required: false },
    ],
  },
]

export default function Contratos() {
  // Estados para clientes
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: "Maria & João Silva",
      email: "maria.silva@email.com",
      phone: "(11) 99999-9999",
      address: "Rua das Flores, 123",
      city: "São Paulo - SP",
      type: "pessoa_fisica",
      category: "casamento",
      status: "ativo",
      registrationDate: "2024-01-10",
      notes: "Casal muito organizado, gosta de detalhes",
    },
    {
      id: 2,
      name: "Ana Carolina Santos",
      email: "ana.santos@email.com",
      phone: "(11) 88888-8888",
      address: "Av. Paulista, 456",
      city: "São Paulo - SP",
      type: "pessoa_fisica",
      category: "aniversario_15",
      status: "ativo",
      registrationDate: "2024-01-15",
      notes: "Aniversário de 15 anos - tema jardim encantado",
    },
    {
      id: 3,
      name: "TechCorp Ltda",
      email: "eventos@techcorp.com",
      phone: "(11) 77777-7777",
      address: "Rua Comercial, 789",
      city: "São Paulo - SP",
      type: "pessoa_juridica",
      category: "corporativo",
      status: "ativo",
      registrationDate: "2023-12-01",
      notes: "Empresa de tecnologia - eventos corporativos regulares",
    },
    {
      id: 4,
      name: "Pedro & Carla Costa",
      email: "pedro.costa@email.com",
      phone: "(11) 66666-6666",
      address: "Rua dos Jardins, 321",
      city: "São Paulo - SP",
      type: "pessoa_fisica",
      category: "casamento",
      status: "prospecto",
      registrationDate: "2024-01-20",
      notes: "Interessados em casamento para 2024",
    },
  ])

  // Estados para contratos
  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: 1,
      clientId: 1,
      client: "Maria & João Silva",
      eventName: "Casamento Silva",
      eventDate: "2024-03-14",
      totalValue: 25000,
      paidValue: 15000,
      remainingValue: 10000,
      installments: 5,
      paymentMethod: "cartao_credito",
      status: "ativo",
      createdAt: "2024-01-10",
      dueDate: "2024-02-15",
      description: "Contrato para casamento com decoração completa",
      eventType: "casamento",
      buffetType: "Buffet Premium",
      venue: "Salão Nobre",
      guests: 150,
    },
    {
      id: 2,
      clientId: 2,
      client: "Ana Carolina Santos",
      eventName: "Aniversário 15 Anos",
      eventDate: "2024-02-28",
      totalValue: 15000,
      paidValue: 15000,
      remainingValue: 0,
      installments: 3,
      paymentMethod: "pix",
      status: "pago",
      createdAt: "2024-01-15",
      dueDate: "2024-02-20",
      description: "Festa de 15 anos tema jardim encantado",
      eventType: "aniversario_15",
      buffetType: "Buffet Jovem",
      venue: "Salão das Flores",
      guests: 100,
    },
    {
      id: 3,
      clientId: 3,
      client: "TechCorp Ltda",
      eventName: "Evento Corporativo Q1",
      eventDate: "2024-04-04",
      totalValue: 35000,
      paidValue: 10000,
      remainingValue: 25000,
      installments: 7,
      paymentMethod: "boleto",
      status: "ativo",
      createdAt: "2024-01-20",
      dueDate: "2024-02-10",
      description: "Evento corporativo trimestral",
      eventType: "corporativo",
      buffetType: "Buffet Executivo",
      venue: "Auditório Principal",
      guests: 200,
    },
    {
      id: 4,
      clientId: 4,
      client: "Pedro & Carla Costa",
      eventName: "Orçamento Casamento",
      eventDate: "2024-06-15",
      totalValue: 30000,
      paidValue: 0,
      remainingValue: 30000,
      installments: 1,
      paymentMethod: "pix",
      status: "orcamento",
      createdAt: "2024-01-25",
      dueDate: "2024-02-25",
      description: "Orçamento inicial para casamento",
      eventType: "casamento",
      buffetType: "Buffet Premium",
      venue: "A definir",
      guests: 180,
    },
  ])

  // Estados para contratos gerados
  const [generatedContracts, setGeneratedContracts] = useState<GeneratedContract[]>([])

  // Estados da interface
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
  const [selectedGeneratedContract, setSelectedGeneratedContract] = useState<GeneratedContract | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Estados dos modais
  const [isNewContractOpen, setIsNewContractOpen] = useState(false)
  const [isContractEditorOpen, setIsContractEditorOpen] = useState(false)
  const [isViewContractOpen, setIsViewContractOpen] = useState(false)
  const [isViewGeneratedDocOpen, setIsViewGeneratedDocOpen] = useState(false)

  // Estados do editor
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(null)
  const [contractFields, setContractFields] = useState<Record<string, string>>({})
  const [previewContract, setPreviewContract] = useState("")
  const [documentType, setDocumentType] = useState<"contrato" | "orcamento">("contrato")

  // Estados para novo contrato
  const [newContract, setNewContract] = useState({
    clientId: 0,
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    clientCity: "",
    clientType: "pessoa_fisica",
    clientCategory: "casamento",
    eventName: "",
    eventDate: "",
    totalValue: "",
    installments: "",
    paymentMethod: "",
    description: "",
    isNewClient: false,
  })

  // Função para formatar CPF
  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    }
    return value
  }

  // Função para copiar texto para clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copiado!",
        description: "Texto copiado para a área de transferência.",
      })
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar o texto.",
        variant: "destructive",
      })
    }
  }

  // Filtrar clientes
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())

    if (statusFilter === "all") return matchesSearch

    const clientContracts = contracts.filter((c) => c.clientId === client.id)
    if (statusFilter === "ativos") {
      return matchesSearch && clientContracts.some((c) => c.status === "ativo")
    }
    if (statusFilter === "pagos") {
      return matchesSearch && clientContracts.some((c) => c.status === "pago")
    }
    if (statusFilter === "orcamentos") {
      return matchesSearch && clientContracts.some((c) => c.status === "orcamento")
    }
    if (statusFilter === "prospectos") {
      return matchesSearch && client.status === "prospecto"
    }

    return matchesSearch
  })

  // Obter contratos de um cliente
  const getClientContracts = (clientId: number) => {
    return contracts.filter((c) => c.clientId === clientId)
  }

  // Obter documentos gerados de um cliente
  const getClientGeneratedContracts = (clientId: number) => {
    return generatedContracts.filter((gc) => gc.clientId === clientId)
  }

  // Criar novo contrato
  const handleCreateContract = () => {
    let clientId = newContract.clientId

    // Se é um novo cliente, criar primeiro
    if (newContract.isNewClient) {
      const newClient: Client = {
        id: clients.length + 1,
        name: newContract.clientName,
        email: newContract.clientEmail,
        phone: newContract.clientPhone,
        address: newContract.clientAddress,
        city: newContract.clientCity,
        type: newContract.clientType as any,
        category: newContract.clientCategory as any,
        status: "prospecto",
        registrationDate: new Date().toISOString().split("T")[0],
      }
      setClients([...clients, newClient])
      clientId = newClient.id
    }

    const totalValue = Number.parseFloat(newContract.totalValue)
    const installments = Number.parseInt(newContract.installments)

    const contract: Contract = {
      id: contracts.length + 1,
      clientId: clientId,
      client: newContract.clientName || clients.find((c) => c.id === clientId)?.name || "",
      eventName: newContract.eventName,
      eventDate: newContract.eventDate,
      totalValue: totalValue,
      paidValue: 0,
      remainingValue: totalValue,
      installments: installments,
      paymentMethod: newContract.paymentMethod as any,
      status: "orcamento",
      createdAt: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      description: newContract.description,
    }

    setContracts([...contracts, contract])
    setNewContract({
      clientId: 0,
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      clientAddress: "",
      clientCity: "",
      clientType: "pessoa_fisica",
      clientCategory: "casamento",
      eventName: "",
      eventDate: "",
      totalValue: "",
      installments: "",
      paymentMethod: "",
      description: "",
      isNewClient: false,
    })
    setIsNewContractOpen(false)
    toast({
      title: "Contrato criado!",
      description: "Novo contrato adicionado com sucesso.",
    })
  }

  // Abrir editor de contrato
  const handleOpenContractEditor = (contract: Contract, type: "contrato" | "orcamento" = "contrato") => {
    setSelectedContract(contract)
    setDocumentType(type)

    // Encontrar o template baseado no tipo
    let template: ContractTemplate
    if (type === "orcamento") {
      template = contractTemplates.find((t) => t.id === "orcamento")!
    } else {
      template = contractTemplates.find((t) => t.eventType === contract.eventType) || contractTemplates[0]
    }

    setSelectedTemplate(template)

    // Pré-preencher campos
    const client = clients.find((c) => c.id === contract.clientId)
    const initialFields: Record<string, string> = {
      nomeEmpresa: "Sua Empresa Ltda",
      cnpjEmpresa: "12.345.678/0001-90",
      telefoneEmpresa: "(11) 99999-0000",
      emailEmpresa: "contato@suaempresa.com",
      localContrato: "São Paulo, SP",
      dataContrato: new Date().toLocaleDateString("pt-BR"),
      valorTotal: contract.totalValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      numeroParcelas: contract.installments.toString(),
      valorParcela: (contract.totalValue / contract.installments).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      dataEvento: new Date(contract.eventDate).toLocaleDateString("pt-BR"),
      numeroConvidados: contract.guests?.toString() || "100",
      tipoBuffet: contract.buffetType || "Buffet Completo",
      localEvento: contract.venue || "A definir",
      servicosInclusos: "Decoração, buffet, som, iluminação, cerimonial",
      formaVencimento: "todo dia 10 de cada mês",
    }

    if (type === "orcamento" && client) {
      initialFields.nomeCliente = client.name
      initialFields.telefoneCliente = client.phone
      initialFields.emailCliente = client.email
      initialFields.enderecoCliente = `${client.address}, ${client.city}`
      initialFields.tipoEvento = contract.eventType || "Casamento"
      initialFields.detalhamentoValores = "Decoração: R$ 10.000\nBuffet: R$ 15.000\nSom e Iluminação: R$ 5.000"
      initialFields.condicoesPagamento = "50% na assinatura, 50% no dia do evento"
      initialFields.validadeProposta = "30 dias"
      initialFields.observacoes = contract.description || ""
    } else if (contract.eventType === "casamento") {
      const nomes = contract.client.split(" & ")
      initialFields.nomeNoivo = nomes[1] || contract.client
      initialFields.nomeNoiva = nomes[0] || contract.client
      initialFields.cpfNoivo = "000.000.000-00"
      initialFields.cpfNoiva = "000.000.000-00"
      initialFields.enderecoNoivo = client?.address || "Rua Exemplo, 123, Bairro, Cidade - UF"
      initialFields.enderecoNoiva = client?.address || "Rua Exemplo, 456, Bairro, Cidade - UF"
    }

    setContractFields(initialFields)
    updatePreview(template.template, initialFields)
    setIsContractEditorOpen(true)
  }

  // Atualizar preview
  const updatePreview = (template: string, fields: Record<string, string>) => {
    let preview = template
    Object.entries(fields).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, "g")
      preview = preview.replace(regex, value || `[${key}]`)
    })
    setPreviewContract(preview)
  }

  // Alterar campo
  const handleFieldChange = (key: string, value: string, type?: string) => {
    let formattedValue = value
    if (type === "cpf") {
      formattedValue = formatCPF(value)
    }

    const newFields = { ...contractFields, [key]: formattedValue }
    setContractFields(newFields)
    if (selectedTemplate) {
      updatePreview(selectedTemplate.template, newFields)
    }
  }

  // Salvar contrato
  const handleSaveContract = () => {
    if (!selectedTemplate || !selectedContract) return

    const client = clients.find((c) => c.id === selectedContract.clientId)
    if (!client) return

    const generatedContract: GeneratedContract = {
      id: `${selectedContract.id}-${Date.now()}`,
      contractId: selectedContract.id,
      clientId: selectedContract.clientId,
      templateId: selectedTemplate.id,
      templateName: selectedTemplate.name,
      client: selectedContract.client,
      eventName: selectedContract.eventName,
      content: previewContract,
      fields: contractFields,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      status: "rascunho",
      type: documentType,
    }

    // Verificar se já existe
    const existingIndex = generatedContracts.findIndex(
      (gc) =>
        gc.contractId === selectedContract.id && gc.templateId === selectedTemplate.id && gc.type === documentType,
    )

    if (existingIndex >= 0) {
      const updated = [...generatedContracts]
      updated[existingIndex] = {
        ...updated[existingIndex],
        content: previewContract,
        fields: contractFields,
        updatedAt: new Date().toISOString(),
        version: updated[existingIndex].version + 1,
      }
      setGeneratedContracts(updated)
    } else {
      setGeneratedContracts([...generatedContracts, generatedContract])
    }

    toast({
      title: `${documentType === "orcamento" ? "Orçamento" : "Contrato"} salvo!`,
      description: "O documento foi salvo na biblioteca.",
    })
  }

  // Obter ícone da categoria
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "casamento":
        return <Heart className="h-4 w-4" />
      case "aniversario":
      case "aniversario_15":
        return <Calendar className="h-4 w-4" />
      case "corporativo":
        return <Building className="h-4 w-4" />
      case "formatura":
        return <GraduationCap className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  // Obter cor da categoria
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "casamento":
        return "bg-pink-100 text-pink-700 border-pink-200"
      case "aniversario":
      case "aniversario_15":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "corporativo":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "formatura":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  // Obter cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "pago":
        return "bg-green-100 text-green-700 border-green-200"
      case "atrasado":
        return "bg-red-100 text-red-700 border-red-200"
      case "orcamento":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "cancelado":
        return "bg-gray-100 text-gray-700 border-gray-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  // Calcular estatísticas
  const totalContracts = contracts.filter((c) => c.status !== "orcamento").length
  const activeContracts = contracts.filter((c) => c.status === "ativo").length
  const totalReceivable = contracts
    .filter((c) => c.status === "ativo")
    .reduce((sum, contract) => sum + contract.remainingValue, 0)
  const totalContracted = contracts
    .filter((c) => c.status !== "orcamento")
    .reduce((sum, contract) => sum + contract.totalValue, 0)

  return (
    <LayoutWrapper>
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Contratos & Clientes</h1>
              <p className="text-gray-600 mt-1">Gerencie clientes, contratos e documentos em um só lugar</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar clientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filtrar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="ativos">Com Contratos Ativos</SelectItem>
                  <SelectItem value="pagos">Com Contratos Pagos</SelectItem>
                  <SelectItem value="orcamentos">Com Orçamentos</SelectItem>
                  <SelectItem value="prospectos">Prospectos</SelectItem>
                </SelectContent>
              </Select>

              <Dialog open={isNewContractOpen} onOpenChange={setIsNewContractOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Contrato
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px]">
                  <DialogHeader>
                    <DialogTitle>Criar Novo Contrato</DialogTitle>
                    <DialogDescription>
                      Crie um contrato para um cliente existente ou cadastre um novo cliente
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {/* Seleção de Cliente */}
                    <div className="space-y-2">
                      <Label>Cliente</Label>
                      <div className="flex items-center space-x-2">
                        <Select
                          value={newContract.clientId.toString()}
                          onValueChange={(value) => {
                            const clientId = Number.parseInt(value)
                            if (clientId === 0) {
                              setNewContract({ ...newContract, clientId: 0, isNewClient: true })
                            } else {
                              const client = clients.find((c) => c.id === clientId)
                              if (client) {
                                setNewContract({
                                  ...newContract,
                                  clientId: clientId,
                                  clientName: client.name,
                                  clientEmail: client.email,
                                  clientPhone: client.phone,
                                  clientAddress: client.address,
                                  clientCity: client.city,
                                  clientType: client.type,
                                  clientCategory: client.category,
                                  isNewClient: false,
                                })
                              }
                            }
                          }}
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Selecione um cliente ou crie novo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">+ Novo Cliente</SelectItem>
                            {clients.map((client) => (
                              <SelectItem key={client.id} value={client.id.toString()}>
                                {client.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Dados do Novo Cliente */}
                    {newContract.isNewClient && (
                      <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
                        <h4 className="font-medium text-gray-900">Dados do Novo Cliente</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Nome Completo</Label>
                            <Input
                              value={newContract.clientName}
                              onChange={(e) => setNewContract({ ...newContract, clientName: e.target.value })}
                              placeholder="Nome do cliente"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                              type="email"
                              value={newContract.clientEmail}
                              onChange={(e) => setNewContract({ ...newContract, clientEmail: e.target.value })}
                              placeholder="email@exemplo.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Telefone</Label>
                            <Input
                              value={newContract.clientPhone}
                              onChange={(e) => setNewContract({ ...newContract, clientPhone: e.target.value })}
                              placeholder="(11) 99999-9999"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Categoria</Label>
                            <Select
                              value={newContract.clientCategory}
                              onChange={(e) => setNewContract({ ...newContract, clientCategory: e.target.value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="casamento">Casamento</SelectItem>
                                <SelectItem value="aniversario_15">Aniversário 15 Anos</SelectItem>
                                <SelectItem value="aniversario">Aniversário</SelectItem>
                                <SelectItem value="corporativo">Corporativo</SelectItem>
                                <SelectItem value="outro">Outro</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2 col-span-2">
                            <Label>Endereço</Label>
                            <Input
                              value={newContract.clientAddress}
                              onChange={(e) => setNewContract({ ...newContract, clientAddress: e.target.value })}
                              placeholder="Rua, número, bairro"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Dados do Contrato */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nome do Evento</Label>
                        <Input
                          value={newContract.eventName}
                          onChange={(e) => setNewContract({ ...newContract, eventName: e.target.value })}
                          placeholder="Ex: Casamento Silva"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Data do Evento</Label>
                        <Input
                          type="date"
                          value={newContract.eventDate}
                          onChange={(e) => setNewContract({ ...newContract, eventDate: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Valor Total</Label>
                        <Input
                          type="number"
                          value={newContract.totalValue}
                          onChange={(e) => setNewContract({ ...newContract, totalValue: e.target.value })}
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Parcelas</Label>
                        <Input
                          type="number"
                          value={newContract.installments}
                          onChange={(e) => setNewContract({ ...newContract, installments: e.target.value })}
                          placeholder="1"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Descrição</Label>
                      <Textarea
                        value={newContract.description}
                        onChange={(e) => setNewContract({ ...newContract, description: e.target.value })}
                        placeholder="Detalhes do evento..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewContractOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateContract}>Criar Contrato</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{totalContracts}</div>
                    <div className="text-sm text-gray-600">Contratos Ativos</div>
                    <div className="text-xs text-gray-500">{activeContracts} em andamento</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-orange-50 rounded-xl">
                    <AlertCircle className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">R$ {totalReceivable.toLocaleString("pt-BR")}</div>
                    <div className="text-sm text-gray-600">A Receber</div>
                    <div className="text-xs text-gray-500">pendente de pagamento</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-50 rounded-xl">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">R$ {totalContracted.toLocaleString("pt-BR")}</div>
                    <div className="text-sm text-gray-600">Total Contratado</div>
                    <div className="text-xs text-gray-500">valor total dos contratos</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-purple-50 rounded-xl">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{clients.length}</div>
                    <div className="text-sm text-gray-600">Clientes Cadastrados</div>
                    <div className="text-xs text-gray-500">{generatedContracts.length} documentos gerados</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interface Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de Clientes */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-sm h-full">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-600" />
                    Clientes
                  </CardTitle>
                  <CardDescription>Clique em um cliente para ver seus contratos e documentos</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px]">
                    <div className="space-y-3">
                      {filteredClients.map((client) => {
                        const clientContracts = getClientContracts(client.id)
                        const activeContract = clientContracts.find((c) => c.status === "ativo")
                        const totalValue = clientContracts.reduce((sum, c) => sum + c.totalValue, 0)
                        const paidValue = clientContracts.reduce((sum, c) => sum + c.paidValue, 0)

                        return (
                          <div
                            key={client.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                              selectedClient?.id === client.id
                                ? "border-blue-200 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => setSelectedClient(client)}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 text-sm">{client.name}</h4>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge className={getCategoryColor(client.category)} size="sm">
                                    <div className="flex items-center space-x-1">
                                      {getCategoryIcon(client.category)}
                                      <span className="capitalize text-xs">{client.category.replace("_", " ")}</span>
                                    </div>
                                  </Badge>
                                  {client.status === "prospecto" && (
                                    <Badge variant="outline" size="sm">
                                      Prospecto
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">
                                  {clientContracts.length} contrato{clientContracts.length !== 1 ? "s" : ""}
                                </div>
                                {totalValue > 0 && (
                                  <div className="text-xs text-gray-500">R$ {totalValue.toLocaleString("pt-BR")}</div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Phone className="h-3 w-3" />
                                <span>{client.phone}</span>
                              </div>
                              {activeContract && (
                                <Badge className={getStatusColor(activeContract.status)} size="sm">
                                  {activeContract.status}
                                </Badge>
                              )}
                            </div>

                            {/* Barra de progresso para contratos ativos */}
                            {activeContract && activeContract.totalValue > 0 && (
                              <div className="mt-3">
                                <div className="flex justify-between items-center text-xs mb-1">
                                  <span className="text-gray-600">Pagamento</span>
                                  <span className="font-medium">
                                    {Math.round((activeContract.paidValue / activeContract.totalValue) * 100)}%
                                  </span>
                                </div>
                                <div className="bg-gray-200 rounded-full h-1.5">
                                  <div
                                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                                    style={{
                                      width: `${(activeContract.paidValue / activeContract.totalValue) * 100}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Painel de Detalhes do Cliente */}
            <div className="lg:col-span-2">
              {selectedClient ? (
                <div className="space-y-6">
                  {/* Informações do Cliente */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900 flex items-center justify-between">
                        <div className="flex items-center">
                          <User className="h-5 w-5 mr-2 text-blue-600" />
                          <span>{selectedClient.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getCategoryColor(selectedClient.category)}>
                            <div className="flex items-center space-x-1">
                              {getCategoryIcon(selectedClient.category)}
                              <span className="capitalize">{selectedClient.category.replace("_", " ")}</span>
                            </div>
                          </Badge>
                          <Button
                            size="sm"
                            onClick={() => {
                              setNewContract({
                                ...newContract,
                                clientId: selectedClient.id,
                                clientName: selectedClient.name,
                                clientEmail: selectedClient.email,
                                clientPhone: selectedClient.phone,
                                clientAddress: selectedClient.address,
                                clientCity: selectedClient.city,
                                clientType: selectedClient.type,
                                clientCategory: selectedClient.category,
                                isNewClient: false,
                              })
                              setIsNewContractOpen(true)
                            }}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Novo Contrato
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>{selectedClient.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{selectedClient.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{selectedClient.city}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>
                            Cliente desde {new Date(selectedClient.registrationDate).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                      </div>
                      {selectedClient.notes && (
                        <p className="text-sm text-gray-600 mt-3 p-3 bg-gray-50 rounded-lg">{selectedClient.notes}</p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Contratos do Cliente */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">Contratos & Orçamentos</CardTitle>
                      <CardDescription>Histórico de contratos e documentos do cliente</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {getClientContracts(selectedClient.id).map((contract) => (
                          <div key={contract.id} className="border rounded-lg p-4 hover:bg-gray-50">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h4 className="font-medium text-gray-900">{contract.eventName}</h4>
                                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(contract.eventDate).toLocaleDateString("pt-BR")}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <DollarSign className="h-4 w-4" />
                                    <span>R$ {contract.totalValue.toLocaleString("pt-BR")}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getStatusColor(contract.status)}>
                                  <span className="capitalize">{contract.status}</span>
                                </Badge>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setIsViewContractOpen(true)}>
                                      <Eye className="mr-2 h-4 w-4" />
                                      Visualizar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleOpenContractEditor(contract, "orcamento")}>
                                      <FileText className="mr-2 h-4 w-4" />
                                      Gerar Orçamento
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleOpenContractEditor(contract, "contrato")}>
                                      <FileEdit className="mr-2 h-4 w-4" />
                                      Gerar Contrato
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Editar
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>

                            {/* Progresso do Pagamento */}
                            {contract.status === "ativo" && contract.totalValue > 0 && (
                              <div className="mt-3">
                                <div className="flex justify-between items-center text-sm mb-2">
                                  <span className="text-gray-600">Progresso do Pagamento</span>
                                  <span className="font-medium">
                                    R$ {contract.paidValue.toLocaleString("pt-BR")} de R${" "}
                                    {contract.totalValue.toLocaleString("pt-BR")}
                                  </span>
                                </div>
                                <div className="bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{
                                      width: `${(contract.paidValue / contract.totalValue) * 100}%`,
                                    }}
                                  />
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                  <span>{Math.round((contract.paidValue / contract.totalValue) * 100)}% pago</span>
                                  <span>Restam R$ {contract.remainingValue.toLocaleString("pt-BR")}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}

                        {getClientContracts(selectedClient.id).length === 0 && (
                          <div className="text-center py-8">
                            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum contrato encontrado</h3>
                            <p className="text-gray-600 mb-4">Este cliente ainda não possui contratos cadastrados</p>
                            <Button
                              onClick={() => {
                                setNewContract({
                                  ...newContract,
                                  clientId: selectedClient.id,
                                  clientName: selectedClient.name,
                                  clientEmail: selectedClient.email,
                                  clientPhone: selectedClient.phone,
                                  clientAddress: selectedClient.address,
                                  clientCity: selectedClient.city,
                                  clientType: selectedClient.type,
                                  clientCategory: selectedClient.category,
                                  isNewClient: false,
                                })
                                setIsNewContractOpen(true)
                              }}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Criar Primeiro Contrato
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Documentos Gerados */}
                  {getClientGeneratedContracts(selectedClient.id).length > 0 && (
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-900">Documentos Gerados</CardTitle>
                        <CardDescription>Contratos e orçamentos salvos na biblioteca</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {getClientGeneratedContracts(selectedClient.id).map((doc) => (
                            <div
                              key={doc.id}
                              className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                              onClick={() => {
                                setSelectedGeneratedContract(doc)
                                setIsViewGeneratedDocOpen(true)
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h5 className="font-medium text-gray-900 text-sm">{doc.templateName}</h5>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <Badge
                                      className={
                                        doc.type === "orcamento"
                                          ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                                          : "bg-blue-100 text-blue-700 border-blue-200"
                                      }
                                      size="sm"
                                    >
                                      {doc.type === "orcamento" ? "Orçamento" : "Contrato"}
                                    </Badge>
                                    <Badge
                                      className={
                                        doc.status === "rascunho"
                                          ? "bg-gray-100 text-gray-700 border-gray-200"
                                          : doc.status === "finalizado"
                                            ? "bg-blue-100 text-blue-700 border-blue-200"
                                            : "bg-green-100 text-green-700 border-green-200"
                                      }
                                      size="sm"
                                    >
                                      {doc.status}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      copyToClipboard(doc.content)
                                    }}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      const element = document.createElement("a")
                                      const file = new Blob([doc.content], { type: "text/plain" })
                                      element.href = URL.createObjectURL(file)
                                      element.download = `${doc.templateName}-${doc.client
                                        .replace(/\s+/g, "-")
                                        .toLowerCase()}.txt`
                                      document.body.appendChild(element)
                                      element.click()
                                      document.body.removeChild(element)
                                    }}
                                  >
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="text-xs text-gray-500 mt-2">
                                Versão {doc.version} • Atualizado em{" "}
                                {new Date(doc.updatedAt).toLocaleDateString("pt-BR")}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <Card className="border-0 shadow-sm h-full">
                  <CardContent className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Users className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Selecione um cliente</h3>
                      <p className="text-gray-600">Escolha um cliente da lista para ver seus contratos e documentos</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Modal Visualizar Contrato */}
        <Dialog open={isViewContractOpen} onOpenChange={setIsViewContractOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalhes do Contrato</DialogTitle>
              <DialogDescription>Informações completas do contrato selecionado</DialogDescription>
            </DialogHeader>
            {selectedContract && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Cliente</Label>
                    <p className="text-lg font-semibold">{selectedContract.client}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Evento</Label>
                    <p className="text-lg font-semibold">{selectedContract.eventName}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Data do Evento</Label>
                    <p className="text-lg">{new Date(selectedContract.eventDate).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Status</Label>
                    <Badge className={getStatusColor(selectedContract.status)}>
                      <span className="capitalize">{selectedContract.status}</span>
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Valor Total</Label>
                    <p className="text-lg font-semibold text-green-600">
                      R$ {selectedContract.totalValue.toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Valor Pago</Label>
                    <p className="text-lg font-semibold text-blue-600">
                      R$ {selectedContract.paidValue.toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Valor Restante</Label>
                    <p className="text-lg font-semibold text-red-600">
                      R$ {selectedContract.remainingValue.toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
                {selectedContract.description && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Descrição</Label>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedContract.description}</p>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewContractOpen(false)}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal Visualizar Documento Gerado */}
        <Dialog open={isViewGeneratedDocOpen} onOpenChange={setIsViewGeneratedDocOpen}>
          <DialogContent className="max-w-[90vw] w-full h-[90vh] flex flex-col">
            <DialogHeader className="flex-shrink-0">
              <DialogTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>{selectedGeneratedContract?.templateName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    className={
                      selectedGeneratedContract?.type === "orcamento"
                        ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                        : "bg-blue-100 text-blue-700 border-blue-200"
                    }
                  >
                    {selectedGeneratedContract?.type === "orcamento" ? "Orçamento" : "Contrato"}
                  </Badge>
                  <Badge
                    className={
                      selectedGeneratedContract?.status === "rascunho"
                        ? "bg-gray-100 text-gray-700 border-gray-200"
                        : selectedGeneratedContract?.status === "finalizado"
                          ? "bg-blue-100 text-blue-700 border-blue-200"
                          : "bg-green-100 text-green-700 border-green-200"
                    }
                  >
                    {selectedGeneratedContract?.status}
                  </Badge>
                </div>
              </DialogTitle>
              <DialogDescription>
                Cliente: {selectedGeneratedContract?.client} • Versão {selectedGeneratedContract?.version} • Criado em{" "}
                {selectedGeneratedContract
                  ? new Date(selectedGeneratedContract.createdAt).toLocaleDateString("pt-BR")
                  : ""}
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 bg-gray-50 border rounded-lg overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-6">
                  <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-gray-800">
                    {selectedGeneratedContract?.content || "Documento não encontrado"}
                  </pre>
                </div>
              </ScrollArea>
            </div>

            <DialogFooter className="border-t pt-4 flex-shrink-0">
              <Button variant="outline" onClick={() => setIsViewGeneratedDocOpen(false)}>
                Fechar
              </Button>
              <Button
                variant="outline"
                onClick={() => selectedGeneratedContract && copyToClipboard(selectedGeneratedContract.content)}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copiar Texto
              </Button>
              <Button
                onClick={() => {
                  if (selectedGeneratedContract) {
                    const element = document.createElement("a")
                    const file = new Blob([selectedGeneratedContract.content], { type: "text/plain" })
                    element.href = URL.createObjectURL(file)
                    element.download = `${selectedGeneratedContract.templateName}-${selectedGeneratedContract.client
                      .replace(/\s+/g, "-")
                      .toLowerCase()}.txt`
                    document.body.appendChild(element)
                    element.click()
                    document.body.removeChild(element)
                  }
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal Editor de Contrato */}
        <Dialog open={isContractEditorOpen} onOpenChange={setIsContractEditorOpen}>
          <DialogContent className="max-w-[95vw] w-full h-[90vh] flex flex-col">
            <DialogHeader className="flex-shrink-0">
              <DialogTitle className="flex items-center space-x-2">
                <FileEdit className="h-5 w-5 text-purple-600" />
                <span>Editor de {documentType === "orcamento" ? "Orçamento" : "Contrato"}</span>
              </DialogTitle>
              <DialogDescription>
                {documentType === "orcamento"
                  ? "Crie um orçamento personalizado para o cliente"
                  : "Edite o contrato usando templates pré-definidos com campos personalizáveis"}
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 flex min-h-0 space-x-6 py-4">
              {/* Painel Esquerdo - Formulário */}
              <div className="w-1/3 flex flex-col min-h-0">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Modelo de {documentType === "orcamento" ? "Orçamento" : "Contrato"}</Label>
                    <Select
                      value={selectedTemplate?.id || ""}
                      onValueChange={(templateId) => {
                        const template = contractTemplates.find((t) => t.id === templateId)
                        if (template) {
                          setSelectedTemplate(template)
                          updatePreview(template.template, contractFields)
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um modelo" />
                      </SelectTrigger>
                      <SelectContent>
                        {contractTemplates
                          .filter((t) => (documentType === "orcamento" ? t.id === "orcamento" : t.id !== "orcamento"))
                          .map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedTemplate && (
                  <ScrollArea className="flex-1 mt-4">
                    <div className="space-y-6 pr-4">
                      <div className="border-t pt-4">
                        <h3 className="font-semibold text-gray-900 mb-3">
                          Campos do {documentType === "orcamento" ? "Orçamento" : "Contrato"}
                        </h3>
                        <div className="space-y-3">
                          {selectedTemplate.fields.map((field) => (
                            <div key={field.key} className="space-y-1">
                              <Label htmlFor={field.key} className="text-sm">
                                {field.label}
                                {field.required && <span className="text-red-500 ml-1">*</span>}
                              </Label>
                              {field.type === "text" && (
                                <Input
                                  id={field.key}
                                  value={contractFields[field.key] || ""}
                                  onChange={(e) => handleFieldChange(field.key, e.target.value)}
                                  placeholder={`Digite ${field.label.toLowerCase()}`}
                                  className="text-sm"
                                />
                              )}
                              {field.type === "cpf" && (
                                <Input
                                  id={field.key}
                                  value={contractFields[field.key] || ""}
                                  onChange={(e) => handleFieldChange(field.key, e.target.value, "cpf")}
                                  placeholder="000.000.000-00"
                                  className="text-sm"
                                  maxLength={14}
                                />
                              )}
                              {field.type === "number" && (
                                <Input
                                  id={field.key}
                                  type="number"
                                  value={contractFields[field.key] || ""}
                                  onChange={(e) => handleFieldChange(field.key, e.target.value)}
                                  placeholder={`Digite ${field.label.toLowerCase()}`}
                                  className="text-sm"
                                />
                              )}
                              {field.type === "date" && (
                                <Input
                                  id={field.key}
                                  type="date"
                                  value={contractFields[field.key] || ""}
                                  onChange={(e) => handleFieldChange(field.key, e.target.value)}
                                  className="text-sm"
                                />
                              )}
                              {field.type === "select" && field.options && (
                                <Select
                                  value={contractFields[field.key] || ""}
                                  onValueChange={(value) => handleFieldChange(field.key, value)}
                                >
                                  <SelectTrigger className="text-sm">
                                    <SelectValue placeholder={`Selecione ${field.label.toLowerCase()}`} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {field.options.map((option) => (
                                      <SelectItem key={option} value={option}>
                                        {option}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Dados da Empresa</h3>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <Label className="text-sm">Nome da Empresa</Label>
                            <Input
                              value={contractFields.nomeEmpresa || ""}
                              onChange={(e) => handleFieldChange("nomeEmpresa", e.target.value)}
                              placeholder="Nome da sua empresa"
                              className="text-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-sm">CNPJ</Label>
                            <Input
                              value={contractFields.cnpjEmpresa || ""}
                              onChange={(e) => handleFieldChange("cnpjEmpresa", e.target.value)}
                              placeholder="00.000.000/0000-00"
                              className="text-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-sm">Telefone</Label>
                            <Input
                              value={contractFields.telefoneEmpresa || ""}
                              onChange={(e) => handleFieldChange("telefoneEmpresa", e.target.value)}
                              placeholder="(11) 99999-0000"
                              className="text-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-sm">Email</Label>
                            <Input
                              value={contractFields.emailEmpresa || ""}
                              onChange={(e) => handleFieldChange("emailEmpresa", e.target.value)}
                              placeholder="contato@suaempresa.com"
                              className="text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                )}
              </div>

              {/* Painel Direito - Preview do Contrato */}
              <div className="flex-1 border-l pl-6 flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-4 flex-shrink-0">
                  <h3 className="font-semibold text-gray-900">
                    Preview do {documentType === "orcamento" ? "Orçamento" : "Contrato"}
                  </h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar
                    </Button>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Gerar PDF
                    </Button>
                  </div>
                </div>

                <div className="flex-1 bg-white border rounded-lg overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="p-6">
                      <div className="max-w-none">
                        <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-gray-800">
                          {previewContract || "Selecione um modelo para começar..."}
                        </pre>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>

            <DialogFooter className="border-t pt-4 flex-shrink-0">
              <Button variant="outline" onClick={() => setIsContractEditorOpen(false)}>
                Cancelar
              </Button>
              <Button variant="outline" onClick={() => copyToClipboard(previewContract)}>
                <Copy className="h-4 w-4 mr-2" />
                Copiar Texto
              </Button>
              <Button onClick={handleSaveContract}>
                <Save className="h-4 w-4 mr-2" />
                Salvar {documentType === "orcamento" ? "Orçamento" : "Contrato"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </LayoutWrapper>
  )
}
