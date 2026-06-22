# AWS Certified Cloud Practitioner (CLF-C02) — Cheat Sheet

**Exam facts:** 65 questions, 90 minutes, scaled score out of 1000, passing score = 700. Multiple choice and multiple response. No labs/coding.

**Domain weights:** Cloud Concepts 24% · Security & Compliance 30% · Cloud Technology & Services 34% · Billing, Pricing & Support 12%

---

## Domain 1: Cloud Concepts (24%)

**6 Benefits of Cloud**
1. Trade capital expense (CapEx) for variable expense (OpEx)
2. Benefit from massive economies of scale
3. Stop guessing capacity
4. Increase speed and agility
5. Stop spending money running/maintaining data centers
6. Go global in minutes

**AWS Well-Architected Framework — 6 Pillars**
- Operational Excellence
- Security
- Reliability
- Performance Efficiency
- Cost Optimization
- Sustainability

**AWS Cloud Adoption Framework (CAF) — 6 Perspectives**
Business, People, Governance, Platform, Security, Operations
(Business/People/Governance = "what" — non-technical. Platform/Security/Operations = "how" — technical.)

**7 Rs of Migration**
Retire, Retain, Rehost ("lift and shift"), Relocate, Repurchase, Replatform, Refactor/Re-architect

**Cloud Models**
- Public cloud / Hybrid / On-premises
- IaaS (you manage OS+, e.g. EC2) vs PaaS (platform managed, e.g. Elastic Beanstalk) vs SaaS (fully managed app, e.g. Gmail)

---

## Domain 2: Security & Compliance (30%) — biggest chunk, study hard

**Shared Responsibility Model** (the #1 most-tested concept)
- AWS = security **OF** the cloud → physical hardware, global infrastructure, facilities, networking, virtualization layer
- Customer = security **IN** the cloud → data, IAM configuration, OS patching (on EC2), firewall/network config, encryption choices

**IAM Basics**
- Root account: created at sign-up, has full access — lock it down, enable MFA, don't use day-to-day
- Users / Groups / Roles / Policies (JSON documents that grant/deny permissions)
- Roles = temporary permissions assumed by users, services, or apps (no long-term credentials)
- Principle of least privilege; MFA recommended everywhere
- IAM is global (not region-specific) and free

**AWS Organizations**
- Manage multiple AWS accounts centrally
- SCPs (Service Control Policies) = guardrails restricting what accounts *can* do (max permissions)
- Consolidated billing = single payment method, volume discounts across accounts

**Key Security Services (know what each one is FOR)**

| Service | Purpose |
|---|---|
| IAM | Identity & access management |
| AWS Shield | DDoS protection (Standard = free/automatic, Advanced = paid) |
| AWS WAF | Web Application Firewall — filters HTTP(S) traffic (SQL injection, XSS) |
| KMS | Manage encryption keys |
| Inspector | Automated security/vulnerability assessment of workloads |
| GuardDuty | Intelligent threat detection (analyzes logs for malicious activity) |
| Macie | Discovers sensitive data (PII) in S3 using ML |
| Security Hub | Centralized dashboard of security findings across services |
| Artifact | On-demand access to AWS compliance reports/agreements (audit evidence) |
| Trusted Advisor | Best-practice checks across account |

**Network Security: Security Groups vs NACLs**

| | Security Group | Network ACL |
|---|---|---|
| Level | Instance (ENI) | Subnet |
| Rules | Allow only | Allow AND deny |
| State | Stateful (return traffic auto-allowed) | Stateless (must allow both directions) |
| Evaluation | All rules evaluated | Rules evaluated in order (lowest number first) |

**AWS Trusted Advisor — 5 Categories**
Cost Optimization, Performance, Security, Fault Tolerance, Service Limits
(Core checks free for everyone; full checks need Business/Enterprise support plan)

---

## Domain 3: Cloud Technology & Services (34%) — the big one

**Global Infrastructure**
- **Region** = geographic area with multiple data centers (choose for latency, cost, compliance/data residency)
- **Availability Zone (AZ)** = one or more discrete data centers within a region, isolated but connected via low-latency links (use 2+ AZs for high availability)
- **Edge Location** = CDN endpoint (CloudFront) for caching content closer to users

**Compute**

| Service | What it is |
|---|---|
| EC2 | Virtual servers (IaaS) — you manage the OS |
| Lambda | Serverless functions — pay per invocation/duration, no servers to manage |
| Elastic Beanstalk | PaaS — upload code, AWS handles provisioning/scaling |
| ECS / EKS | Container orchestration (Docker / Kubernetes) |
| Fargate | Serverless compute *for containers* (no EC2 to manage) |
| Auto Scaling | Automatically adds/removes EC2 instances based on demand |
| Elastic Load Balancing (ELB) | Distributes traffic across multiple instances/AZs (ALB, NLB, CLB) |

**EC2 Pricing Models**
- On-Demand: pay per second/hour, no commitment, most expensive
- Reserved Instances: 1 or 3-year commitment, big discount, for steady-state workloads
- Spot Instances: bid on spare capacity, cheapest, can be interrupted — for fault-tolerant/flexible workloads
- Savings Plans: commit to $/hour spend for 1-3 years, flexible across instance types
- Dedicated Hosts: physical server dedicated to you (compliance/licensing needs)

**Storage**

| Service | What it is |
|---|---|
| S3 | Object storage, unlimited, 11 nines durability |
| EBS | Block storage — attaches to ONE EC2 instance (like a virtual hard drive) |
| EFS | File storage — can be mounted by MANY EC2 instances simultaneously (NFS) |
| Storage Gateway | Hybrid storage — bridges on-prem to AWS storage |
| Snowball / Snowmobile | Physical devices to transfer huge amounts of data into AWS |

**S3 Storage Classes (most → least expensive, most → least available)**
Standard → Intelligent-Tiering → Standard-IA → One Zone-IA → Glacier Instant Retrieval → Glacier Flexible Retrieval → Glacier Deep Archive (cheapest, hours of retrieval time)

**Database**

| Service | What it is |
|---|---|
| RDS | Managed relational DB (MySQL, PostgreSQL, SQL Server, Oracle, MariaDB) |
| Aurora | AWS's own MySQL/PostgreSQL-compatible relational DB — faster & cheaper than standard RDS engines |
| DynamoDB | Managed NoSQL, serverless, key-value, single-digit ms latency at any scale |
| Redshift | Data warehouse — for analytics/BI, not transactional workloads |
| ElastiCache | In-memory caching (Redis/Memcached) to speed up read-heavy apps |

**Networking**

| Service | What it is |
|---|---|
| VPC | Your own isolated virtual network within AWS |
| Subnets | Public (internet-facing) or Private (internal only) segments of a VPC |
| Internet Gateway | Allows VPC resources to reach the internet |
| NAT Gateway | Lets private subnet resources initiate outbound internet traffic (without being publicly reachable) |
| Route 53 | DNS service + domain registration |
| CloudFront | CDN — caches content at edge locations |
| Direct Connect | Dedicated physical network line from on-prem to AWS (not over public internet) |
| Site-to-Site VPN | Encrypted connection over the public internet to AWS |

**Management & Monitoring**

| Service | What it is |
|---|---|
| CloudWatch | Metrics, dashboards, alarms, logs |
| CloudTrail | Logs every API call/action for auditing ("who did what, when") |
| Config | Tracks resource configuration changes & compliance over time |
| Systems Manager | Operational hub — patching, automation, running commands at scale |

---

## Domain 4: Billing, Pricing & Support (12%)

**Pricing Fundamentals**
- Pay-as-you-go, no upfront commitment required (but discounts exist for commitment)
- AWS Free Tier: 12 months free / always free / trials, depending on service

**Billing & Cost Tools**

| Tool | Purpose |
|---|---|
| Cost Explorer | Visualize and analyze spend over time |
| AWS Budgets | Set custom cost/usage thresholds and get alerts |
| Cost & Usage Report | Most detailed breakdown of costs/usage |
| Pricing Calculator | Estimate costs *before* deploying anything |
| Consolidated Billing | One bill across all accounts in an Organization, combined for volume discounts |

**Support Plans**

| Plan | Key feature |
|---|---|
| Basic | Free — docs, forums, basic account/billing support only |
| Developer | Email support during business hours, general guidance |
| Business | 24/7 phone/chat/email, faster response times, full Trusted Advisor checks |
| Enterprise On-Ramp | Faster response, pool of Technical Account Managers (TAM) |
| Enterprise | Fastest response (15 min for critical), dedicated TAM, concierge support |

---

## Common Mix-Ups (these get tested constantly)

- **Security Group vs NACL** → instance-level/stateful/allow-only vs subnet-level/stateless/allow+deny
- **EBS vs EFS** → one instance vs many instances
- **RDS vs DynamoDB** → relational/SQL vs NoSQL key-value
- **On-Demand vs Reserved vs Spot vs Savings Plans** → flexibility vs commitment vs cheapest-but-interruptible vs flexible spend commitment
- **Region vs AZ vs Edge Location** → geographic area vs data center cluster vs CDN cache point
- **Vertical scaling** (bigger instance) **vs Horizontal scaling** (more instances)
- **IAM Role vs IAM User** → temporary/assumed vs permanent identity
- **CloudWatch vs CloudTrail** → performance/metrics monitoring vs API call auditing

---

## Day-Of Exam Tips

- Flag uncertain questions and move on — you can return to them; don't burn time early
- For multiple-response questions, the number of correct answers needed is usually stated ("Select TWO")
- When two answers seem right, pick the more *secure*, more *managed/serverless*, or more *cost-effective* option — AWS exams favor AWS-native best practices
- Eliminate obviously wrong answers first, even if you're unsure of the right one
- Read the last sentence of long scenario questions first — it usually tells you what's actually being asked
