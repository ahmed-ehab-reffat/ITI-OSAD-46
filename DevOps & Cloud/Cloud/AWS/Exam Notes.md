1. Amazon GuardDuty >> runtime detection, analyzes account-wide logs and uses machine learning to detect any data mining or suspicious behaviour
    
2. AWS IAM Access Analyzer >> checks all the services policies, IAM roles
    
3. amazon macie >> uses machine learning to classify sensitive s3 data

4. aws shield >> protect against malicious traffic (DDOS)

5.  AWS Certificate Manager (ACM) >> ssl certificate manager
    
6. AWS KMS (key management service) >> encrypt data on EBS, S3 or RDS

7.  AWS WAF (Web Application Firewall) >> prevent sql injection, css and other web exploits

8. AWS global accelerator >> provides AWS `private global network` which is faster than congested world wide web and provides fast `failovers`

9. AWS Storage Gateway >> transfer data to aws, but it caches frequently accessed data on the on-premise data center (hybrid)

10. AWS Budget >> Set limits, map out future plans, and trigger custom `alerts/notifications`
    
11. AWS Cost and Usage Report >> Raw, highly granular metadata data sheets exported directly to `Amazon S3`
    
12. AWS Cost Explorer >> Visualize, `graph`, review `historical trends`, and look for savings opportunities

13. `AWS Organizations` has a feature called (Consolidated billing) >> بالجملة
    
14. FSx >> windows & linux 
15. EFS >> Linux

16. Trusted Advisor >> Analyze your AWS accounts and provides recommendation on 6 categories: • Cost optimization • Performance • Security • Fault tolerance • Service limits • Operational Excellence, also Trusted Advisor checks security groups for rules that allow unrestricted access to a resource.
17. cloud9 >> ide
18. amazon ahtena >> query data on amazon s3 like sql queries
19. aws `image builder` service makes `AMIs`
20. Amazon Inspector >> Continuously scan EC2/Lambda/Containers for software vulnerabilities, bugs, or patches and network vulnerabilities (open ports)
21. aws config >> a fully managed AWS service that continuously monitors, records, and audits the configurations of your AWS resources, `Identifies unauthorized changes`, `monitors for security misconfigurations`
22. internet gateway >> horizontally scaled, highly available VPC component that acts as a bridge between your Virtual Private Cloud (VPC) and the public internet, it enables connection in both ways (Resources can access the internet, and external users can access resources)
23. NAT Gateway >> Only allows one-way traffic. Instances in _private_ subnets can reach out to the internet for updates, but external users on the internet cannot initiate connections into those instances
24. aws backup >> a fully managed, policy-based service that centralizes and automates data protection across AWS services and hybrid workloads. It simplifies compliance, streamlines ransomware recovery, and allows you to enforce backup plans across Amazon EC2, EBS, RDS, DynamoDB, S3, and EFS
25. amazon workspaces >> is a fully managed Desktop-as-a-Service (DaaS) solution provided by Amazon Web Services (AWS). It allows organizations to provision secure, cloud-based virtual desktops for their users, eliminating the need to buy, deploy, and manage physical hardware or complex local Virtual Desktop Infrastructure (VDI). Users can seamlessly access their personal or pooled virtual desktops from anywhere using any supported device
26. step functions >> a serverless orchestration service that lets you build, scale, and visualize workflows, it's a drap and drop tool that can access more than 220 aws service (like n8n)
27. AWS IAM Identity Center (AWS Single Sign-On) >> centralized, cloud-native service for managing workforce access across multiple AWS accounts, applications, and third-party software, Users sign in once and gain unified access to the AWS Management Console, AWS Command Line Interface (AWS CLI), and business cloud applications.
28. pricing calculator (projected pricing fees) >> The AWS Pricing Calculator is a free, web-based tool provided by Amazon Web Services that allows you to estimate the cost of your planned cloud architecture
29. aws secrets manager vs key management service (kms) >> Secrets Manager is a secure vault for storing application credentials (like passwords and API keys), while KMS is a cryptographic engine that generates and manages encryption keys
![[Pasted image 20260702015431.png]]
30. 

CAF >> 484 in the pdf
WAF >> 467 in the pdf
## WAF (well architectured framework) 6 pillars (PROCSS) :
--------------
- #### WAF : helps stop guessing the capacity needs and test your systems at production scale
1. **Operational excellence** : the ability to run and monitor systems to deliver business value, you should apply those `design principles` :
	1. Make frequent, small, reversible changes - So that in case of any failure, you can reverse it
	2. Anticipate failure
	3. Learn from all operational failures and implement observability for actionable insights - performance, reliability, cost...
2. **Security** : the ability to protect information, systems, and assets while delivering business value through risk assessments and mitigation strategies, you should apply those `design principles` :
	1. Implement a strong identity foundation - Centralize privilege management and reduce (or even eliminate) reliance on long-term credentials - Principle of least privilege - IAM
	2. Protect data in transit and at rest - Encryption, tokenization, and access control
	3. Shared Responsibility Model
3. **Reliability** : Ability of a system to recover from infrastructure or service disruptions, dynamically acquire computing resources to meet demand, and mitigate disruptions such as misconfigurations or transient network issues, you should apply those `design principles`:
	1. Test recovery procedures - Use automation to simulate different failures or to recreate scenarios that led to failures before
	2. Scale horizontally to increase aggregate system availability - Distribute requests across multiple, smaller resources to ensure that they don't share a common point of failure
	3. Stop guessing capacity - Maintain the optimal level to satisfy demand without over or under provisioning - Use Auto Scaling
4. **Performance Efficiency** : the ability to use computing resources efficiently to meet system requirements, and to maintain that efficiency as demand changes and technologies evolve, you should apply those `design principles`:
	1. Go global in minutes - Easy deployment in multiple regions
	2. Experiment more often - Easy to carry out comparative testing
	3. Democratize advanced technologies - Advance technologies become services and hence you can focus more on product development
	4. Mechanical sympathy - Be aware of all AWS services
5. **Cost Optimization** : the ability to run systems to deliver business value at the lowest price point, you should apply those `design principles` :
	1. Adopt a consumption mode - Pay only for what you use
	2. Measure overall efficiency - Use CloudWatch
	3.  Use managed and application level services to reduce cost of ownership - As managed services operate at cloud scale, they can offer a lower cost per transaction or service
6. **Sustainability** : focuses on minimizing the environmental impacts of running cloud workloads, you should apply those `design principles`: 
	1. Understand your impact – establish performance indicators, evaluate improvements
	2. Maximize utilization – Right size each workload to maximize the energy efficiency of the underlying hardware and minimize idle resources.
	3. Anticipate and adopt new, more efficient hardware and software offerings – and design for flexibility to adopt new technologies over time.

## CAF (cloud adoption framework) 6 pillars (BOGSPP)
------------
- #### CAF : Helps you build and then execute a comprehensive plan for your digital transformation in AWS
1. **Business Prespective** (Business Capabilities) : helps ensure that your cloud investments accelerate your digital transformation ambitions and business outcomes.
2. **People Perspective** (Business Capabilities) : serves as a bridge between technology and business, accelerating the cloud journey to help organizations more rapidly evolve to a culture of continuous growth and learning
3. **Governance Perspective** (Business Capabilities) : helps you orchestrate (guardrails) your cloud initiatives while maximizing organizational benefits and minimizing transformation- related risks
![[Pasted image 20260702012100.png]]
4. **Platform Perspective** (Technical Capabilities) : helps you build an enterprise-grade, scalable, hybrid cloud platform; modernize existing workloads; and implement new cloud-native solutions.
5. **Security Perspective** (Technical Capabilities) : helps you achieve the confidentiality, integrity, and availability of your data and cloud workloads
6. **Operations Perspective** (Technical Capabilities) : helps ensure that your cloud services are delivered at a level that meets the needs of your business. (Execution & Doing)
- #### CAF – Transformation Phases :
	1. **Envision** – demonstrate how the Cloud will accelerate business outcomes by identifying transformation opportunities and create a foundation for your digital transformation
	2. **Align** – identify capability gaps across the 6 AWS CAF Perspectives which results in an Action Plan
	3. **Launch** – build and deliver pilot initiatives in production and demonstrate incremental business value
	4. **Scale** – expand pilot initiatives to the desired scale while realizing the desired business benefits