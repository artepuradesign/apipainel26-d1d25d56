

# Plano de Implementacao: Reordenacao do Menu e Cobranca Condicional

## 1. Resumo da Solicitacao

Duas tarefas principais:

**Tarefa 1**: Reordenar o menu lateral para exibir: Dashboard > Painel de Controle > Minha Conta...

**Tarefa 2**: Implementar verificacao para que os modulos de consulta so cobrem quando existirem registros encontrados. Se nao houver resultados, o usuario deve ser notificado que a consulta nao foi cobrada.

---

## 2. Analise da Arquitetura Atual

### 2.1 Menu Lateral (Sidebar)
O menu e definido em `src/components/dashboard/layout/sidebar/assinanteSidebarItems.ts`. A ordem atual:
1. Dashboard (apenas para suporte)
2. Minha Conta
3. Paineis Disponiveis
4. Painel de Controle
5. Administracao (apenas para suporte)
6. Integracoes (apenas para suporte)
7. Indicacoes

### 2.2 Modulos de Consulta
Existem 3 tipos de implementacao:

| Tipo | Arquivos | Comportamento Atual |
|------|----------|---------------------|
| Autonomo (proprio codigo) | ConsultarCpfSimples, ConsultarCpfBasico, ConsultarCpfCompleto | Cobra sempre que CPF e encontrado |
| Usa PuxaTudo + chargeAlwaysExceptHistory | Score, CNS, Pis, Senhas, etc. | Cobra sempre, mesmo sem dados |
| Usa PuxaTudo (cobranca condicional) | Parentes, Telefones, Emails, Enderecos | Ja funciona corretamente |

### 2.3 Logica Existente de Cobranca Condicional
O arquivo `ConsultarCpfPuxaTudo.tsx` ja possui o mecanismo:
- `isConditionalChargeMode`: ativa cobranca apos verificar se ha registros
- `chargeAlwaysExceptHistory`: flag que DESATIVA a cobranca condicional
- `conditionalChargePending`: estado que guarda dados para cobrar depois

---

## 3. Alteracoes Necessarias

### 3.1 Reordenacao do Menu Lateral

**Arquivo**: `src/components/dashboard/layout/sidebar/assinanteSidebarItems.ts`

**Nova ordem**:
1. Dashboard (suporte)
2. Painel de Controle
3. Minha Conta
4. Paineis Disponiveis
5. Administracao (suporte)
6. Integracoes (suporte)
7. Indicacoes

### 3.2 Modulos que Usam ConsultarCpfPuxaTudo

Para ativar a cobranca condicional, basta **remover** a prop `chargeAlwaysExceptHistory` dos seguintes arquivos:

| Arquivo | Module ID | onlySection |
|---------|-----------|-------------|
| ConsultarCpfCns.tsx | 135 | cns |
| ConsultarCpfPis.tsx | 139 | pis |
| ConsultarCpfScore.tsx | 140 | score |
| ConsultarCpfAuxilioEmergencia.tsx | 148 | auxilio_emergencial |
| ConsultarCpfRais.tsx | 149 | rais |
| ConsultarCpfInss.tsx | 150 | inss |
| ConsultarCpfSenhasEmail.tsx | 151 | senhas_email |
| ConsultarCpfSenhasCpf.tsx | 152 | senhas_cpf |
| ConsultarCpfCovid.tsx | 137 | covid |
| ConsultarCpfEmails.tsx | 141 | emails |
| ConsultarCpfTelefones.tsx | 142 | telefones |
| ConsultarCpfEnderecos.tsx | 143 | enderecos |
| ConsultarCpfEmpresasSocio.tsx | 145 | empresas_socio |
| ConsultarCpfMei.tsx | 144 | mei |
| ConsultarCpfDividasAtivas.tsx | 146 | dividas_ativas |
| ConsultarCpfCertidao.tsx | 136 | certidao |
| ConsultarCpfTitulo.tsx | 138 | titulo_eleitor |

### 3.3 Atualizacao do ConsultarCpfPuxaTudo

**Arquivo**: `src/pages/dashboard/ConsultarCpfPuxaTudo.tsx`

Adicionar novas secoes ao sistema de contagem condicional:
- Mapear cada `onlySection` para verificar se ha dados na secao correspondente
- Expandir a funcao `getConditionalRequiredCount()` para incluir todas as secoes

### 3.4 Modulos Autonomos (Simples, Basico, Completo)

**Arquivos**:
- `ConsultarCpfSimples.tsx`
- `ConsultarCpfBasico.tsx`
- `ConsultarCpfCompleto.tsx`

Estes arquivos tem codigo proprio. A logica atual ja verifica se o CPF foi encontrado antes de cobrar. Preciso confirmar se o toast de "consulta nao cobrada" esta implementado quando CPF nao e encontrado.

### 3.5 ConsultarNomeCompleto

**Arquivo**: `ConsultarNomeCompleto.tsx`

Este ja implementa a logica corretamente (linhas 380-446):
- Se `temResultados = true`: registra e cobra
- Se `temResultados = false`: exibe toast "Nenhum registro encontrado. Nao houve cobranca."

---

## 4. Detalhamento Tecnico

### 4.1 Novo Mapeamento de Secoes para Contagem

```text
onlySection -> Campo de verificacao
cns         -> result.cns
pis         -> result.pis
score       -> result.score
titulo      -> result.titulo_eleitor
certidao    -> result.certidao_nascimento
covid       -> vacinaData
auxilio_emergencial -> auxilioData
rais        -> raisData
inss        -> result.inss
mei         -> meiData
empresas_socio -> empresasSocioData
dividas_ativas -> dividasData
senhas_email -> result.senha_email
senhas_cpf   -> senhaCpfData
telefones   -> result.telefones (array.length)
emails      -> result.emails (array.length)
enderecos   -> result.enderecos (array.length)
parentes    -> parentesData (array.length)
```

### 4.2 Logica de Contagem Expandida

Atualizar `getConditionalRequiredCount()` em ConsultarCpfPuxaTudo.tsx:

```text
- Para campos simples (string): verificar se existe e nao esta vazio
- Para arrays: verificar se length > 0
- Para objetos: verificar se nao e null/undefined
```

---

## 5. Backend (PHP)

O backend atual ja suporta a logica de cobranca condicional atraves do endpoint `/consultas-cpf/create`. O sistema:
1. Recebe o payload com `cost` e `status`
2. Registra a consulta na tabela `consultations`
3. Debita o saldo do usuario

A mudanca e apenas no frontend, que passa a chamar o endpoint apenas quando ha registros.

---

## 6. Arquivos a Modificar

| Arquivo | Tipo de Alteracao |
|---------|-------------------|
| `assinanteSidebarItems.ts` | Reordenar itens do menu |
| `ConsultarCpfPuxaTudo.tsx` | Expandir mapeamento de secoes |
| `ConsultarCpfCns.tsx` | Remover chargeAlwaysExceptHistory |
| `ConsultarCpfPis.tsx` | Remover chargeAlwaysExceptHistory |
| `ConsultarCpfScore.tsx` | Remover chargeAlwaysExceptHistory |
| `ConsultarCpfCertidao.tsx` | Remover chargeAlwaysExceptHistory |
| `ConsultarCpfTitulo.tsx` | Remover chargeAlwaysExceptHistory |
| `ConsultarCpfCovid.tsx` | Remover chargeAlwaysExceptHistory |
| `ConsultarCpfAuxilioEmergencia.tsx` | Remover chargeAlwaysExceptHistory |
| `ConsultarCpfRais.tsx` | Remover chargeAlwaysExceptHistory |
| `ConsultarCpfInss.tsx` | Remover chargeAlwaysExceptHistory |
| `ConsultarCpfMei.tsx` | Remover chargeAlwaysExceptHistory |
| `ConsultarCpfEmpresasSocio.tsx` | Remover chargeAlwaysExceptHistory |
| `ConsultarCpfDividasAtivas.tsx` | Remover chargeAlwaysExceptHistory |
| `ConsultarCpfSenhasEmail.tsx` | Remover chargeAlwaysExceptHistory |
| `ConsultarCpfSenhasCpf.tsx` | Remover chargeAlwaysExceptHistory |
| `ConsultarCpfSimples.tsx` | Adicionar toast quando CPF nao encontrado |
| `ConsultarCpfBasico.tsx` | Adicionar toast quando CPF nao encontrado |
| `ConsultarCpfCompleto.tsx` | Adicionar toast quando CPF nao encontrado |

---

## 7. Fluxo de Usuario Apos Implementacao

```text
1. Usuario digita CPF e clica "Consultar"
2. Sistema busca dados no banco
3. SE dados encontrados:
   - Exibe resultados
   - Registra consulta e debita saldo
   - Toast: "CPF encontrado! Valor cobrado: R$ X.XX"
4. SE dados NAO encontrados:
   - Exibe mensagem de "nao encontrado"
   - NAO registra consulta
   - NAO debita saldo
   - Toast: "Nenhum registro encontrado. Consulta nao cobrada."
```

---

## 8. Estimativa

- **Reordenacao do menu**: 1 arquivo, alteracao simples
- **Modulos com PuxaTudo**: 15 arquivos, remocao de 1 linha cada
- **Modulos autonomos**: 3 arquivos, adicionar logica de toast
- **PuxaTudo (core)**: 1 arquivo, expandir mapeamento de secoes

