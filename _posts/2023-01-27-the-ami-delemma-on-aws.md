---
layout: portfolio-modern
article: true
title: "AWS AMI virtualization: HVM, PV, and modern EC2"
date: 2023-01-27
updated: 2026-10-13
excerpt: "Understand historical AMI virtualization types and the compatibility checks that matter for current EC2 workloads."
summary: "HVM is the virtualization type used by current-generation EC2 instances. PV is relevant to older environments. Check architecture, instance compatibility, boot configuration, and storage behavior together when selecting an AMI."
kicker: "ENGINEERING NOTES / FIELD GUIDE"
permalink: /posts/2023/01/ami-virtualization-hvm-pv/
tags: ["AWS", "EC2", "AMI"]
sections:
  - id: what-an-ami-describes
    title: "What an AMI describes"
  - id: hvm-and-pv
    title: "HVM and PV"
  - id: check-compatibility
    title: "Check compatibility"
  - id: a-migration-example
    title: "Migration example"
---
## What an AMI describes

An Amazon Machine Image supplies information needed to launch an EC2 instance, including its operating-system image and associated configuration. Virtualization is one compatibility dimension, alongside processor architecture and storage choices.

Do not confuse HVM versus PV with EBS versus instance-store backing. Those describe different aspects of an image. An AMI also belongs to a Region; plan image availability where the workload will run. [AMI characteristics](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ComponentsAMIs.html).

## HVM and PV

HVM presents a hardware virtual machine to the guest operating system. PV historically used a guest-aware boot path such as PV-GRUB. Current-generation EC2 instance types support HVM, while PV support is limited to certain previous-generation types. HVM also supports the hardware capabilities needed for enhanced networking and GPU workloads. [EC2 instance compatibility](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html).

{% include article-diagram.html image="/images/articles/ami-virtualization.svg" alt="Current-generation EC2 uses an HVM image; legacy PV images depend on compatible previous-generation instance types. Both require separate architecture and storage checks." caption="Compatibility is a set of checks, rather than a choice made from the image name alone." %}

| Dimension | HVM | PV |
| --- | --- | --- |
| Typical relevance | Current EC2 workloads | Historical or legacy workloads |
| Guest environment | Virtualized hardware | Paravirtualized guest path |
| Instance support | Current-generation types | Selected previous-generation types |
| Modern hardware features | Supported where the instance permits | Limited compared with HVM |

## Check compatibility

For an illustrative deployment review, verify these fields before launch:

- **Architecture:** Does the AMI match the intended CPU family, such as `x86_64` or `arm64`?
- **Virtualization:** Is the image appropriate for the selected instance type?
- **Boot and drivers:** Does the operating system support the chosen environment?
- **Root storage:** What persists when an instance is stopped or terminated?
- **Image provenance:** Is the publisher expected, and is the image maintained?

Check the actual AMI metadata and instance documentation. A familiar product name is not enough to establish compatibility.

## A migration example

Suppose an older application runs from a PV image. Build and test an HVM-based replacement instead of treating the change as a label edit. Install the application, restore a test dataset, check startup and health probes, and compare workload behavior.

Plan the data transfer and rollback separately from the image change. An instance’s boot image does not replace a backup strategy or prove that the application will behave correctly on a new CPU architecture.
