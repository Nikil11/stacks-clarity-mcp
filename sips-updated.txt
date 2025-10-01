(Files content cropped to 300k characters, download full ingest to see more)
================================================
FILE: sips/README.md
================================================
Stacks Improvement Proposals
============================

Each directory here contains a Stacks Improvement Proposal as well as all
supplementary materials.

New SIPs may be submitted via pull request, but please make sure they adhere to
the standards described in
[SIP-000](./sip-000/sip-000-stacks-improvement-proposal-process.md).



================================================
FILE: sips/sip-000/sip-000-stacks-improvement-proposal-process.md
================================================
# Preamble

SIP Number: 000

Title: Stacks Improvement Proposal Process

Author: Jude Nelson <jude@stacks.org>, Ken Liao <yukanliao@gmail.com>

Consideration: Governance 

Type: Meta 

Status: Ratified 

Created: 2020-06-23 

License: BSD-2-Clause 

Sign-off: Jude Nelson <jude@stacks.org>, Technical Steering Committee Chair

Discussions-To: https://github.com/stacksgov/sips 

# Abstract

A Stacks Improvement Proposal (SIP) is a design document that provides
information to the greater Stacks ecosystem's participants concerning the design
of the Stacks blockchain and its ongoing operation. Each SIP shall provide a
clear and concise description of features, processes, and/or standards for the
Stacks blockchain and its operators to adopt, with sufficient details provided
such that a reasonable practitioner may use the document to create an
independent but compatible implementation of the proposed improvement.

SIPs are the canonical medium by which new features are proposed and described,
and by which input from the Stacks ecosystem participants is collected. The SIP
Ratification Process is also described in this document, and provides the means
by which SIPs may be proposed, vetted, edited, accepted, rejected, implemented,
and finally incorporated into the Stacks blockchain's design, governance, and
operational procedures. The set of SIPs that have been ratified shall
sufficiently describe the design, governance, and operationalization of the
Stacks blockchain, as well as the means by which future changes to its official
design, implementation, operation, and governance may be incorporated.

# License and Copyright

This SIP is made available under the terms of the BSD-2-Clause license,
available at https://opensource.org/licenses/BSD-2-Clause.  This SIP’s copyright
is held by the Stacks Open Internet Foundation.

# Introduction

Blockchains are unique among distributed systems in that they also
happen to encode a social contract. By running a blockchain node, a user
implicitly agrees to be bound to the social contract's terms embedded within the
blockchain's software. These social contracts are elaborate constructions that
contain not only technical terms (e.g. "a block may be at most 1MB"), but also
economic terms (e.g. "only 21 million tokens may exist") and social terms (e.g.
"no money can leave this account" or "this transaction type was supported
before, but will now be ignored by the system") which the user agrees to uphold
by running a blockchain node.

It stands to reason that the Stacks blockchain is made of more than just
software; it is also made of the people who run it. As such, the act of
developing and managing the Stacks blockchain network includes the act of
helping its people coordinate and agree on what the blockchain is and what it
should do. To this end, this document proposes a process by which the Stacks
blockchain's users can conduct themselves to be the stewards of the blockchain
network in perpetuity.

The goals of this process are to ensure that anyone may submit a SIP in good
faith, that each SIP will receive fair and speedy good-faith consideration by
other people with the relevant expertise, and that any discussions and
decision-making on each SIP's ratification shall happen in public. To achieve
these ends, this document proposes a standard way of presenting a Stacks
Improvement Proposal (SIP), and a standard way of ratifying one.

Each SIP document contains all of the information needed to propose a
non-trivial change to the way in which the Stacks blockchain operates. This
includes both technical considerations, as well as operational and governance
considerations. This document proposes a formal document structure based on both
request-for-comments (RFC) practices in the Internet Engineering Task Force
(IETF), as well as existing blockchain networks.

SIPs must be ratified in order to be incorporated into the definition of what
the Stacks blockchain is, what it does, and how it operates. This document
proposes a ratification process based on existing governance processes from
existing open source projects (including Python, Bitcoin, Ethereum, and Zcash),
and makes provisions for creating and staffing various roles that people must
take on to carry out ratification (e.g. committees, editors, working groups and
so on).

This document uses the word “users” to refer specifically to people who
participate in the greater Stacks ecosystem.  This includes, but is not limited
to, people who mine blocks, people who contribute code, people who run nodes,
people who develop applications that rely on the Stacks blockchain, people who
use such applications, people involved in the project governance, and people
involved in operating software deployments.

# Specification

Each SIP shall adhere to the same general formatting and shall be ratified
through the processes described by this document.

## SIP Format

All SIPs shall be formatted as markdown files. Each section shall be
annotated as a 2nd-level header (e.g. `##`). Subsections may be added with
lower-level headers.

Each SIP shall contain the following sections, in the given order:

- _Preamble_. This section shall provide fields useful for categorizing the SIP.
  The required fields in all cases shall be:
    - _SIP Number_. Each SIP receives a unique number once it has been accepted
      for consideration for ratification (see below). This number is assigned to
      a SIP; its author does not provide it.
    - _Title_. A concise description of the SIP, no more than 20 words long.
    - _Author_. A list of names and email addresses of the SIP's author(s).
    - _Consideration_. What class of SIP this is (see below).
    - _Type_. The SIP track for consideration (see below).
    - _Status_. This SIP's point in the SIP workflow (see below).
    - _Created_. The ISO 8601 date when this SIP was created.
    - _License_. The content license for the SIP (see below for permitted
      licenses).
    - _Sign-off_. The list of relevant persons and their titles who have worked to
      ratify the SIP. This field is not filled in entirely until ratification,
      but is incrementally filled in as the SIP progresses through the ratification
      process.
- Additional SIP fields, which are sometimes required, include:
    - _Layer_. The logical layer of the Stacks blockchain affected. Must be one
    - of the following:
        - _Consensus (soft fork)_. For backwards-compatible proposals for
          transaction-processing.
        - _Consensus (hard fork)_. For backwards-incompatible proposals for
          transaction-processing.
        - _Peer Services_. For proposals to the peer-to-peer network protocol
          stack.
        - _API/RPC_. For proposals to the Stacks blockchain's official
          programmatic interfaces.
        - _Traits_. For proposals for new standardized Clarity trait definitions.
        - _Applications_. For proposals for standardized application protocols
          that interface with the Stacks blockchain.
    - _Discussions-To_. A mailing list where ongoing discussion of the SIP takes
      place.
    - _Comments-Summary_. The comments summary tone.
    - _Comments-URI_. A link to the Stacks blockchain wiki for comments.
    - _License-Code_. Abbreviation for code under a different license than the SIP
      proposal.
    - _Post-History_. Dates of posting the SIP to the Stacks mailing list, or a
      link to a thread with the mailing list.
    - _Requires_. A list of SIPs that must be implemented prior to this SIP.
    - _Replaces_. A list of SIPs that this SIP replaces.
    - _Superceded-By_. A list of SIPs that replace this SIP.

- _Abstract_. This section shall provide a high-level summary of the proposed
  improvement. It shall not exceed 5000 words.
- _Copyright_. This section shall provide the copyright license that governs the
  use of the SIP content. It must be one of the approved set of licenses (see
below).
- _Introduction_. This section shall provide a high-level summary of the
  problem(s) that this SIP proposes to solve, as well as a high-level
description of how the proposal solves them. This section shall emphasize its
novel contributions, and briefly describe how they address the problem(s). Any
motivational arguments and example problems and solutions belong in this
section.
- _Specification_. This section shall provide the detailed technical
  specification. It may include code snippets, diagrams, performance
evaluations, and other supplemental data to justify particular design decisions.
However, a copy of all external supplemental data (such as links to research
papers) must be included with the SIP, and must be made available under an
approved copyright license.
- _Related Work_. This section shall summarize alternative solutions that address
  the same or similar problems, and briefly describe why they are not adequate
solutions. This section may reference alternative solutions in other blockchain
projects, in research papers from academia and industry, other open-source
projects, and so on. This section must be accompanied by a bibliography of
sufficient detail such that someone reading the SIP can find and evaluate the
related works.
- _Backwards Compatibility_. This section shall address any
  backwards-incompatiblity concerns that may arise with the implementation of
this SIP, as well as describe (or reference) technical mitigations for breaking
changes. This section may be left blank for non-technical SIPs.
- _Activation_. This section shall describe the timeline, falsifiable criteria,
  and process for activating the SIP once it is ratified. This applies to both
technical and non-technical SIPs.  This section is used to unambiguously
determine whether or not the SIP has been accepted by the Stacks users once it
has been submitted for ratification (see below).
- _Reference Implementations_. This section shall include one or more references
  to one or more production-quality implementations of the SIP, if applicable.
This section is only informative — the SIP ratification process is independent
of any engineering processes (or other processes) that would be followed to
produce implementations.  If a particular implementation process is desired,
then a detailed description of the process must be included in the Activation
section.  This section may be updated after a SIP is ratified in order to
include an up-to-date listing of any implementations or embodiments of the SIP. 

Additional sections may be included as appropriate.

### Supplemental Materials

A SIP may include any supplemental materials as
appropriate (within reason), but all materials must have an open format
unencumbered by legal restrictions. For example, an LibreOffice `.odp`
slide-deck file may be submitted as supplementary material, but not a Keynote
`.key` file.

When submitting the SIP, supplementary materials must be present within the same
directory, and must be named as `SIP-XXXX-YYY.ext`, where:

- `XXXX` is the SIP number,
- `YYY` is the serial number of the file, starting with 1,
- `.ext` is the file extension.

## SIP Types

The types of SIPs are as follows:

- _Consensus_. This SIP type means that all Stacks blockchain implementations
  would need to adopt this SIP to remain compatible with one another. If this is
the SIP type, then the SIP preamble must have the Layer field set to either
_Consensus (soft fork)_ or _Consensus (hard fork)_.
- _Standard_. This SIP type means that the proposed change affects one or more
  implementations, but does not affect network consensus. If this is the SIP
type, then the SIP preamble must have the Layer field set to indicate which
aspect(s) of the Stacks blockchain are affected by the proposal.
- _Operation_. This SIP type means that the proposal concerns the operation of the
  Stacks blockchain -- in particular, it concerns node operators and miners.
The difference between this SIP type and the Standard type is that this type
does not change any existing protocols.
- _Meta_. This SIP type means that the proposal concerns the SIP ratification
  process. Such a SIP is a proposal to change the way SIPs are handled.
- _Informational_. This is a SIP type that provides useful information, but does
  not require any action to be taken on the part of any user.

New types of SIPs may be created with the ratification of a Meta-type SIP under
the governance consideration (see below). SIP types may not be removed.

## SIP Considerations

A SIP's consideration determines the particular steps needed to ratify the SIP
and incorporate it into the Stacks blockchain. Different SIP considerations have
different criteria for ratification. A SIP can have more than one consideration,
since a SIP may need to be vetted by different users with different domains of
expertise.


- _Technical_. The SIP is technical in nature, and must be vetted by users with
  the relevant technical expertise.
- _Economic_. The SIP concerns the blockchain's token economics. This not only
  includes the STX token, but also any on-chain tokens created within smart
contracts. SIPs that are concerned with fundraising methods, grants, bounties,
and so on also belong in this SIP track.
- _Governance_. The SIP concerns the governance of the Stacks blockchain,
  including the SIP process. This includes amendments to the SIP Ratification
Process, as well as structural considerations such as the creation (or removal)
of various committees, editorial bodies, and formally recognized special
interest groups. In addition, governance SIPs may propose changes to the way by
which committee members are selected.
- _Ethics_. This SIP concerns the behaviors of office-holders in the SIP
  Ratification Process that can affect its widespread adoption.  Such SIPs
describe what behaviors shall be deemed acceptable, and which behaviors shall be
considered harmful to this end (including any remediation or loss of privileges
that misbehavior may entail).  SIPs that propose formalizations of ethics like
codes of conduct, procedures for conflict resolution, criteria for involvement
in governance, and so on would belong in this SIP consideration.
- _Diversity_. This SIP concerns proposals to grow the set of users, with an
  emphasis on including users who are traditionally not involved with
open-source software projects. SIPs that are concerned with evangelism,
advertising, outreach, and so on must have this consideration.

Each SIP consideration shall have a dedicated Advisory Board that ultimately
vets SIPs under their consideration for possible ratification in a timely
fashion (see below).  New considerations may be created via the ratification of
a Meta-type SIP under the governance consideration.

## SIP Workflow

As a SIP is considered for ratification, it passes through multiple statuses as
determined by one or more committees (see next section). A SIP may have exactly
one of the following statuses at any given time:

- _Draft_. The SIP is still being prepared for formal submission. It does not yet
  have a SIP number.
- _Accepted_. The SIP text is sufficiently complete that it constitutes a
  well-formed SIP, and is of sufficient quality that it may be considered for
ratification. A SIP receives a SIP number when it is moved into the Accepted
state by SIP Editors.
- _Recommended_. The people responsible for vetting the SIPs under the
  consideration(s) in which they have expertise have agreed that this SIP should
be implemented. A SIP must be Accepted before it can be Recommended.
- _Activation-In-Progress_.  The SIP has been tentatively approved by the Steering
  Committee for ratification.  However, not all of the criteria for ratification
have been met according to the SIP’s Activation section.  For example, the
Activation section might require miners to vote on activating the SIPs’
implementations, which would occur after the SIP has been transferred into
Activation-In-Progress status but before it is transferred to Ratified status.
- _Ratified._ The SIP has been activated according to the procedures described in
  its Activation section.  Once ratified, a SIP remains ratified in perpetuity,
but a subsequent SIP may supersede it. If the SIP is a Consensus-type SIP, and
then all Stacks blockchain implementations must implement it. A SIP must be
Recommended before it can be Ratified. Moving a SIP into this state may be done
retroactively, once the SIP has been activated according to the terms in its
Activation section.
- _Rejected_. The SIP does not meet at least one of the criteria for ratification
  in its current form. A SIP can become Rejected from any state, except
Ratified.  If a SIP is moved to the Rejected state, then it may be re-submitted
as a Draft.
- _Obsolete_. The SIP is deprecated, but its candidacy for ratification has not
  been officially withdrawn (e.g. it may warrant further discussion).  An
Obsolete SIP may not be ratified, and will ultimately be Withdrawn.
- _Replaced_. The SIP has been superseded by a different SIP.  Its preamble must
  have a Superseded-By field. A Replaced SIP may not be ratified, nor may it be
re-submitted as a Draft-status SIP.  It must be transitioned to a Withdrawn
state once the SIP(s) that replace it have been processed.
- _Withdrawn_. The SIP's authors have ceased working on the SIP. A Withdrawn SIP
  may not be ratified, and may not be re-submitted as a Draft.  It must be
re-assigned a SIP number if taken up again.
    

The act of ratifying a SIP is the act of transitioning it to the Ratified status
-- that is, moving it from Draft to Accepted, from Accepted to Recommended, and
Recommended to Activation-In-Progress, and from Activation-In-Progress to
Ratified, all without the SIP being transitioned to Rejected, Obsolete,
Replaced, or Withdrawn status.  A SIP's current status is recorded in its Status
field in its preamble.

## SIP Committees

The act of deciding the status of a SIP is handled by a set of designated
committees. These committees are composed of users who dedicate their time and
expertise to curate the blockchain, ratifying SIPs on behalf of the rest of the
ecosystem’s users.

There are three types of committee:

- _Steering Committee (SC)_. The roles of the SC are to select Recommended-status
  SIPs to be activated, to determine whether or not a SIP has been activated and
thus ratified, and to formally recognize Consideration Advisory Boards (see
below).
- _Consideration Advisory Boards_. The roles of the Consideration Advisory Boards
  are to provide expert feedback on SIPs that have been moved to Accepted status
in a timely manner, and to transition SIPs to Recommended status if they meet
the Board's consideration criteria, and Rejected status otherwise. 
- _SIP Editors_. The role of the SIP Editors is to identify SIPs in the Draft
  status that can be transitioned to Accepted status. A SIP editor must be able
to vet a SIP to ensure that it is well-formed, that it follows the ratification
workflow faithfully, and that it does not overlap with any already-Accepted SIPs
or SIPs that have since become Recommended or Ratified.
    
Any user may serve on a committee. However, all Stacks committee members must
abide by the SIP Code of Conduct and must have a history of adhering to it.
Failure to adhere to the Code of Conduct shall be grounds for immediate removal
from a committee, and a prohibition against serving on any future committees.

### Compensation

Compensation for carrying out committee duties is outside of the scope of this
document.  This document does not create a provision for compensation for
committee participation, but it does not forbid it either.

### Steering Committee Duties

The Steering Committee's overarching duty is to oversee the evolution of the
Stacks blockchain’s design, operation, and governance, in a way that is
technically sound and feasible, according to the rules and procedures described
in this document. The SC shall be guided by and held accountable by the greater
community of users, and shall make all decisions with the advice of the relevant
Consideration Advisory Boards. 

The SC’s role is that of a steward.  The SC shall select SIPs for ratification
based on how well they serve the greater good of the Stacks users.  Given the
nature of blockchains, the SC's particular responsibilities pertaining to
upgrading the blockchain network are meant to ensure that upgrades happen in a
backwards-compatible fashion if at all possible. While this means that more
radical SIPs may be rejected or may spend a long amount of time in Recommended
status, it also minimizes the chances of an upgrade leading to widespread
disruption (the minimization of which itself serves the greater good).

#### Membership

The initial Steering Committee shall be comprised of at least three members:
two from the Stacks Open Internet Foundation, and one
from the greater Stacks blockchain community (independent of the Stacks
Foundation).

A provisional Steering Committee will be appointed by the Stacks Open Internet Foundation Board
before the launch of the Stacks blockchain’s mainnet (see the "Activation" section).
Once this SIP activates, the Stacks Open Internet Foundation shall select its
representatives in a manner of their choosing within 90 days after activation.
The committee may be expanded later to include more seats.  Once this SIP
activates, the provisional SC will consult with the community to
ratify a SIP that implements a voting procedure whereby
Stacks community members can select the individual who will serve on the
community SC seat.

#### Qualifications

Members of this committee must have deep domain expertise
pertinent to blockchain development, and must have excellent written
communication skills. It is highly recommended that members should have authored
at least one ratified technical-consideration SIP before joining this committee.

#### Responsibilities

The Steering Committee shall be responsible for the following
tasks.

##### Recognizing Consideration Advisory Boards.

The members of the Steering Committee
must bear in mind that they are not infallible, and that they do not know everything
there is to know about what is best for the broader user community. To the
greatest extent practical, the SC shall create and foster the development of
Consideration Advisory Boards in order make informed decisions on subjects that
in which they may not be experts.

Any group of users can form an unofficial working group to help provide feedback
to SIPs, but the SC shall have the power to recognize such groups formally as a
Consideration Advisory Board via at least a two-thirds majority vote. The SC
shall simultaneously recognize one of it’s member to serve as the interim
chairperson while the Advisory Board forms. A SC member cannot normally serve on
a Consideration Advisory Board concurrently with serving on the SC, unless
granted a limited exception by a unanimous vote by the SC (e.g. in order to
address the Board’s business while a suitable chairperson is found).  Formally
recognizing Consideration Advisory Boards shall occur in Public Meetings (see
below) no more than once per quarter.

Once recognized, Consideration Advisory Boards may not be dissolved or
dismissed, unless there are no Accepted or Recommended SIPs that request their
consideration. If this is the case, then the SC may vote to rescind recognition
of a Consideration Advisory Board with a two-thirds majority at one of its
Public Meetings.

In order to identify users who would form a Consideration Advisory Board, users
should organize into an unofficial working group and submit a SIP to petition
that SC recognize the working group as a Consideration Advisory Board.  This
petition must take the form of a Meta-type SIP, and may be used to select the
initial chairperson and define the Board's domain(s) of expertise, bylaws,
membership, meeting procedures, communication channels, and so on, independent
of the SC. The SC would only be able to ratify or reject the SIP.

The SC shall maintain a public index of all Consideration Advisory Boards that
are active, including contact information for the Board and a summary of what
kinds of expertise the Board can offer. This index is meant to be used by SIP
authors to help route their SIPs towards the appropriate reviewers before being
taken up by the SC.

##### Voting on Technical SIPs

The Steering Committee shall select Recommended SIPs
for ratification by moving them to Activation-In-Progress status.  All
technical-consideration SIPs shall require an 80% vote. If it is a
Consensus-type SIP for a hard fork, then a unanimous vote shall be required. If
a SIP is voted on and is not moved to Activation-in-Progress, then it shall be
moved to Rejected status, and the SC shall provide a detailed explanation as to
why they made their decision (see below).

##### Voting on Non-technical SIPs

Not all SIPs are technical in nature. All
non-technical SIPs shall require only a two-thirds majority vote to transition
it to Activation-In-Progress status. The SC members must provide a public
explanation for the way it voted as supplementary materials with the ratified
non-technical SIP (see below).  If the SC votes to move a non-technical SIP to
Activation-In-Progress status, but does not receive the requisite number of
votes, then the SIP shall be transferred to Rejected status, and the SC shall
provide a detailed explanation as to why they made their decision (see below).

##### Overseeing SIP Activation and Ratification

Once a SIP is in Activation-In-Progress status,
the SC shall be responsible for overseeing the procedures and criteria in the
SIP’s Activation section.  The Activation section of a SIP can be thought of as
an “instruction manual” and/or “checklist” for the SC to follow to determine if
the SIP has been accepted by the Stacks users.  The SC shall strictly adhere to
the process set forth in the Activation section.  If the procedure and/or
criteria of the Activation section cannot be met, then the SC may transfer the
SIP to Rejected status and ask the authors to re-submit the SIP with an updated
Activation section.

Once all criteria have been unambiguously meet and all activation procedures
have been followed, the SC shall transition the SIP to Ratified status.  The SC
shall keep a log and provide a record of the steps they took in following a
SIP’s Activation section once the SIP is in Activation-In-Progress status, and
publish them alongside the Ratified SIP as supplemental material.

Due to the hands-on nature of the Activation section, the SC may deem it
appropriate to reject a SIP solely on the quality of its Activation section.
Reasonable grounds for rejection include, but are not limited to, ambiguous
instructions, insufficiently-informative activation criteria, too much work on
the SC members’ parts, the lack of a prescribed activation timeout, and so on.

Before the Stacks mainnet launches, the SC shall ratify a SIP that, when
activated according to the procedures outlined in its Activation section, will
allow Stacks blockchain miners to signal their preferences for the activation of
particular SIPs within the blocks that they mine. This will enable the greater
Stacks community of users to have the final say as to which SIPs activate and
become ratified.

##### Feedback on Recommended SIPs

The Steering Committee shall give a full, fair,
public, and timely evaluation to each SIP transitioned to Recommended status by
Consideration Advisory Boards. A SIP shall only be considered by the SC if the
Consideration Advisory Board chairpeople for each of the SIP's considerations
have signed-off on the SIP (by indicating as such on the SIP's preamble). 

The SC may transition a SIP to Rejected status if it disagrees with the
Consideration Advisory Boards' recommendation. The SC may transition a SIP to
Obsolete status if it finds that the SIP no longer addresses a relevant concern.
It may transition the SIP to a Replaced status if it considers a similar,
alternative SIP that is more likely to succeed. In all cases, the SC shall
ensure that a SIP does not remain in Recommended status for an unreasonable
amount of time.

The SC shall maintain a public record of all feedbacks provided for each SIP it
reviews.

If a SIP is moved to Rejected, Obsolete, or Replaced status, the SIP authors may
appeal the process by re-submitting it in Draft status once the feedback has
been addressed.  The appealed SIP must cite the SC’s feedback as supplemental
material, so that SIP Editors and Consideration Advisory Boards are able to
verify that the feedback has, in fact, been addressed.

##### Public Meetings

The Steering Committee shall hold and record regular public
meetings at least once per month. The SC may decide the items of business for
these meetings at its sole discretion, but it shall prioritize business
pertaining to the ratification of SIPs, the recognition of Consideration
Advisory Boards, and the needs of all outstanding committees. That said, any
user may join these meetings as an observer, and the SC shall make a good-faith
effort to address public comments from observers as time permits.

The SC shall appoint up to two dedicated moderators from the user community for
its engineering meetings, who shall vet questions and commentary from observers
in advance (possibly well before the meeting begins). If there is more than one
moderator, then the moderators may take turns. In addition, the SC shall appoint
a dedicated note-taker to record the minutes of the meetings. All of these
appointees shall be eligible to receive a fixed, regular bounty for their work.

### Consideration Advisory Board Duties

There is an Advisory Board for each SIP consideration, with a designated
chairperson responsible for maintaining copies of all discussion and feedback on
the SIPs under consideration.

#### Membership

All Consideration Advisory Boards begin their life as unofficial
working groups of users who wish to review inbound SIPs according to their
collective expertise.  If they wish to be recognized as an official
Consideration Advisory Board, they shall submit a SIP to the Steering Committee
per the procedure described in the Steering Committee’s duties.  Each
Consideration Advisory Board shall be formally created by the SC with a
designated member serving as its first interim chairperson. After this, the
Consideration Advisory Board may adopt its own bylaws for selecting members and
chairpeople. However, members should have domain expertise relevant to the
consideration.

#### Members

Members shall serve on their respective Consideration Advisory Boards so long as
they are in good standing with the SIP Code of Conduct and in accordance to the
individual Board’s bylaws.  A user may serve on at most three Consideration
Advisory Boards concurrently.

#### Qualifications

Each Consideration Advisory Board member shall have sufficient
domain expertise to provide the Steering Committee with feedback pertaining to a
SIP's consideration. Members shall possess excellent written communication
skills.

#### Responsibilities

Each Consideration Advisory Board shall be responsible for the
following.

##### Chairperson

Each Consideration Advisory Board shall appoint a chairperson, who
shall serve as the point of contact between the rest of the Board and the
Steering Committee. If the chairperson becomes unresponsive, the SC may ask the
Board to appoint a new chairperson (alternatively, the Board may appoint a new
chairperson on its own and inform the SC).  The chairperson shall be responsible
for maintaining the Board’s public list of members’ names and contact
information as a supplementary document to the SIP that the SC ratified to
recognize the Board.

##### Consideration Track

Each Consideration Advisory Board shall provide a clear and
concise description of what expertise it can offer, so that SIP authors may
solicit it with confidence that it will be helpful. The chairperson shall make
this description available to the Steering Committee and to the SIP Editors, so
that both committees can help SIP authors ensure that they receive the most
appropriate feedback.

The description shall be provided and updated by the chairperson to the SC so
that the SC can provide a public index of all considerations a SIP may possess.

##### Feedback

Feedback to SIP Authors Each Consideration Advisory Board shall provide a full,
fair, public, and timely evaluation of any Accepted-status SIP that lists the
Board's consideration in its preamble. The Board may decide to move each SIP to
a Recommended status or a Rejected status based on whether or not the Board
believes that the SIP is feasible, practical, and beneficial to the greater
Stacks ecosystem.

Any feedback created shall be made public. It is the responsibility of the Board
to store and publish all feedbacks for the SIPs it reviews. It shall forward
copies of this feedback to both the SIP authors.

##### Consultation with the Steering Committee

The Steering Committee may need to
follow up with the Consideration Advisory Board in order to clarify its position
or solicit its advice on a particular SIP. For example, the SC may determine
that a Recommended SIP needs to be considered by one or more additional Boards
that have not yet been consulted by the SIP authors.

The Board shall respond to the SC's request for advice in a timely manner, and
shall prioritize feedback on SIPs that are under consideration for ratification.

### SIP Editor Duties

By far the largest committee in the SIP process is the SIP Editor Committee.
The SIP Editors are responsible for maintaining the "inbound funnel" for SIPs
from the greater Stacks community. SIP Editors ensure that all inbound SIPs are
well-formed, relevant, and do not duplicate prior work (including rejected
SIPs).

#### Membership

Anyone may become a SIP Editor by recommendation from an existing SIP
Editor, subject to the “Recruitment” section below.

#### Qualifications

A SIP Editor must demonstrate proficiency in the SIP process and
formatting requirements. A candidate SIP Editor must demonstrate to an existing
SIP Editor that they can independently vet SIPs.

#### Responsibilities

SIP Editors are concerned with shepherding SIPs from Draft
status to Accepted status, and for mentoring community members who want to get
involved with the SIP processes (as applicable).

##### Getting Users Started

SIP Editors should be open and welcoming towards
enthusiastic users who want to help improve the greater Stacks ecosystem. As
such, SIP Editors should encourage users to submit SIPs if they have good ideas
that may be worth implementing.

In addition, SIP Editors should respond to public requests for help from
community members who want to submit a SIP. They may point them towards this
document, or towards other supplemental documents and tools to help them get
started.

##### Feedback

When a SIP is submitted in Draft status, a SIP Editor that takes the
SIP into consideration should provide fair and full feedback on how to make the
SIP ready for its transition to Accepted status. 

To do this, the SIP Editor should:

- Verify that the SIP is well-formed according to the criteria in this document
- Verify that the SIP has not been proposed before
- Verify as best that they can that the SIP is original work
- Verify that the SIP is appropriate for its type and consideration
- Recommend additional Considerations if appropriate
- Ensure that the text is clear, concise, and grammatically-correct English
- Ensure that there are appropriate avenues for discussion of the SIP listed in
  the preamble.

The SIP Editor does not need to provide public feedback to the SIP authors, but
should add their name(s) to the Signed-off field in the SIP preamble once the
SIP is ready to be Accepted.

##### Acceptance

Once a SIP is moved to Accepted, the SIP Editor shall assign it the
smallest positive number not currently used to identify any other SIP. Once that
number is known, the SIP Editor shall set the SIP's status to Accepted, set the
number, and commit the SIP to the SIP repository in order to make it visible to
other SIP Editors and to the Consideration Advisory Boards.

##### Recruitment

Each SIP Editor must list their name and contact information in an
easy-to-find location in the SIP repository, as well list of each SIP Editor
they recommended.  In so doing, the SIP Editors shall curate an “invite tree”
that shows which Editors recommended which other Editors.

A SIP Editor may recommend another user to be a SIP Editor no more than once per
month, and only if they have faithfully moved at least one SIP to Accepted
status in the last quarter.  If a SIP Editor does not participate in editing a
SIP for a full year and a day, then they may be removed from the SIP Editor
list.  The SC may remove a SIP Editor (and some or all of the users he or she
recommended) if they find that the SIP Editor has violated the SIP Code of
Conduct.

Newly-Accepted SIPs, new SIP Editor recruitment, and SIP Editor retirement shall
be submitted as pull requests by SIP Editors to the SIP repository.

## SIP Workflow

The lifecycle of a SIP is summarized in the flow-chart below:

```
    ------------------
    |     Draft      |  <-------------------------. Revise and resubmit
    ------------------                            |
           |                             --------------------
    Submit to SIP Editor ------------->  |     Rejected     |
           |                             --------------------
           |                                      ^
           V                                      |
    ------------------                            |
    |   Accepted     | -------------------------/ | /--------------------------------.
    ------------------                            |                                  |
           |                             --------------------                        |
    Review by Consideration ---------->  |     Rejected     |                        | 
    Advisory Board(s)                    --------------------                        |
           |                                      ^                                  |
           V                                      |                                  |
    -------------------------                     |                                  |
    |      Recommended       | -----------------/ | /------------------------------->|
    -------------------------                     |                                  |
           |                              --------------------                       |
    Vote by the Steering    ----------->  |    Rejected      |                       |
    Committee for activation              --------------------                       |
           |                                      ^                                  |
           V                                      |                                  |
    --------------------------                    |                                  |
    | Activation-in-Progress | -----------------/ | /------------------------------->|
    --------------------------                    |                                  |
           |                             ---------------------                       |
    All activation  ------------------>  |     Rejected      |                       |
    criteria are met       |             ---------------------  ------------------   |
           |               |----------------------------------> |    Obsolete    |   |
           V               |      ---------------------         ------------------   |
    ------------------     *--->  |     Replaced      | --------------->|<-----------*
    |   Ratified     |            ---------------------                 | 
    ------------------                                                  V
                                                                -------------------
                                                                |    Withdrawn    |
                                                                ------------------- 
```

When a SIP is transitioned to Rejected, it is not deleted, but is preserved in
the SIP repository so that it can be referenced as related or prior work by
other SIPs. Once a SIP is Rejected, it may be re-submitted as a Draft at a later
date. SIP Editors may decide how often to re-consider rejected SIPs as an
anti-spam measure, but the Steering Committee and Consideration Advisory Boards
may opt to independently re-consider rejected SIPs at their own discretion.

Once a SIP has been moved to Ratified status, the only changes that may be made
to it are fixing errata and adding supplementary materials.  Substantial changes
to the SIP's body should be done as a separate SIP.

## Public Venues for Conducting Business

The canonical set of SIPs in all state shall be recorded in the same medium that
the canonical copy of this SIP is.  Right now, this is in the Github repository
`https://github.com/stacksgov/sips`, but may be changed before this SIP is
ratified.  New SIPs, edits to SIPs, comments on SIPs, and so on shall be
conducted through Github's facilities for the time being.

In addition, individual committees may set up and use public mailing lists for
conducting business.  The Stacks Open Internet Foundation shall provide a means
for doing so.  Any discussions on the mailing lists that lead to non-trivial
contributions to SIPs should be referenced by these SIPs as supplemental
material.

### Github-specific Considerations

All SIPs shall be submitted as pull requests, and all SIP edits (including status
updates) shall be submitted as pull requests.  The SC, or one or more
individuals or entities appointed by the SC, shall be responsible for merging
pull requests to the main branch.

## SIP Copyright & Licensing

Each SIP must identify at least one acceptable license in its preamble. Source
code in the SIP can be licensed differently than the text. SIPs whose reference
implementation(s) touch existing reference implementation(s) must use the same
license as the existing implementation(s) in order to be considered. Below is a
list of recommended licenses.

- BSD-2-Clause: OSI-approved BSD 2-clause license
- BSD-3-Clause: OSI-approved BSD 3-clause license
- CC0-1.0: Creative Commons CC0 1.0 Universal
- GNU-All-Permissive: GNU All-Permissive License
- GPL-2.0+: GNU General Public License (GPL), version 2 or newer
- LGPL-2.1+: GNU Lesser General Public License (LGPL), version 2.1 or newer

# Related Work

The governance process proposed in this SIP is inspired by the Python PEP
process [1], the Bitcoin BIP2 process [2], the Ethereum Improvement Proposal [3]
processes, the Zcash governance process [4], and the Debian GNU/Linux
distribution governance process [5].  This SIP describes a governance process
where top-level decision-making power is vested in a committee of elected
representatives, which distinguishes it from Debian (which has a single elected
project leader), Python (which has a benevolent dictator for life), and Bitcoin
and ZCash (which vest all decision ratification power solely in the blockchain
miners).  The reason for a top-level steering committee is to ensure that
decision-making power is not vested in a single individual, but also to ensure
that the individuals responsible for decisions are accountable to the community
that elects them (as opposed to only those who have the means to participate
in mining).  This SIP differs from Ethereum's governance
process in that the top-level decision-making body (the "Core Devs" in Ethereum,
and the Steering Committee in Stacks) is not only technically proficient to evaluate
SIPs, but also held accountable through an official governance
process.

[1] https://www.python.org/dev/peps/pep-0001/

[2] https://github.com/bitcoin/bips/blob/master/bip-0002.mediawiki

[3] https://eips.ethereum.org/

[4] https://www.zfnd.org/governance/

[5] https://debian-handbook.info/browse/stable/sect.debian-internals.html

# Activation

This SIP activates once following tasks have been carried out:

- The provisional Steering Committee must be appointed by the Stacks Open Internet
  Foundation Board.
- Mailing lists for the initial committees must be created.
- The initial Consideration Advisory Boards must be formed, if there is interest
  in doing so before this SIP activates.
- A public, online SIP repository must be created to hold all non-Draft SIPs, their edit
  histories, and their feedbacks.
- A directory of Consideration Advisory Boards must be established (e.g. within
  the SIP repository).
- A SIP Code of Conduct should be added as a supplemental document
- The Stacks blockchain mainnet must launch.

# Reference Implementation

Not applicable.




================================================
FILE: sips/sip-002/sip-002-smart-contract-language.md
================================================
# Preamble

SIP Number: 002

Title: The Clarity Smart Contract Language

Author: Aaron Blankstein <aaron@blockstack.com>, Ludo Galabru
<ludo@blockstack.com>

Consideration: Technical

Type: Consensus

Status: Ratified

Created: 29 November 2018

License: BSD 2-Clause

Sign-off: Jude Nelson <jude@stacks.org>, Technical Steering Committee Chair

Discussions-To: https://github.com/stacksgov/sips

# Abstract

In order to support applications which require validation of some
pieces of their logic, we present a smart contracting language for use
with the Stacks blockchain. This smart contracting language can be
used on the Stacks blockchain to support programatic control over
digital assets within the Stacks blockchain (e.g., BNS names, Stacks
tokens, etc.)

While application-chains may use any smart-contract language that they
like, this smart contracting language's VM will be a part of
blockstack-core, and, as such, any blockstack-core node will be able to
validate application chains using this smart contracting language with
a simple configuration change.

This smart contracting language permits static analysis of any legal
smart contract to determine runtime costs. This smart contracting
language is not only Turing-incomplete (a requirement for such static
analysis to be guaranteed successful), but readily permits other kinds
of proofs to be made about the code as well.

# License and Copyright

This SIP is made available under the terms of the BSD-2-Clause license,
available at https://opensource.org/licenses/BSD-2-Clause.  This SIP's copyright
is held by the Stacks Open Internet Foundation.

# Introduction

A smart contract is composed of two parts:

1. A data-space, which is a set of tables of data which only the
   smart contract may modify
2. A set of functions which operate within the data-space of the
   smart contract, though they may call public functions from other smart
   contracts.

Users call smart contracts' public functions by broadcasting a
transaction on the blockchain which invokes the public function.

This smart contracting language differs from most other smart
contracting languages in two important ways:

1. The language _is not_ intended to be compiled. The LISP language
   described in this document is the specification for correctness.
2. The language _is not_ Turing complete. This allows us to guarantee
   that static analysis of programs to determine properties like
   runtime cost and data usage can complete successfully.

# Specification

## Specifying Contracts

A smart contract definition is specified in a LISP language with the
following limitations:

1. Recursion is illegal and there is no `lambda` function.
2. Looping may only be performed via `map`, `filter`, or `fold`
3. The only atomic types are booleans, integers, fixed length
   buffers, and principals
4. There is additional support for lists of the atomic types, however
   the only variable length lists in the language appear as function
   inputs (i.e., there is no support for list operations like append
   or join).
5. Variables may only be created via `let` binding and there
   is no support for mutating functions like `set`.
6. Defining of constants and functions are allowed for simplifying
   code using `define-private` statement. However, these are purely
   syntactic. If a definition cannot be inlined, the contract will be
   rejected as illegal. These definitions are also _private_, in that
   functions defined this way may only be called by other functions
   defined in the given smart contract.
7. Functions specified via `define-public` statements are _public_
   functions.
8. Functions specified via `define-read-only` statements are _public_
   functions and perform _no_ state mutations. Any attempts to 
   modify contract state by these functions or functions called by
   these functions will result in an error.

Public functions return a Response type result. If the function returns
an `ok` type, then the function call is considered valid, and any changes
made to the blockchain state will be materialized. If the function
returns an `err` type, it will be considered invalid, and will have _no
effect_ on the smart contract's state. So if function `foo.A` calls
`bar.B`, and `bar.B` returns an `ok`, but `foo.A` returns an `err`, no
effects from calling `foo.A` materialize--- including effects from
`bar.B`. If, however, `bar.B` returns an `err` and `foo.A` returns an `ok`,
there may be some database effects which are materialized from
`foo.A`, but _no_ effects from calling `bar.B` will materialize.

Unlike functions created by `define-public`, which may only return
Response types, functions created with `define-read-only` may return
any type.

## List Operations

* Lists may be multi-dimensional (i.e., lists may contain other lists), however each
  entry of this list must be of the same type.
* `filter` `map` and `fold` functions may only be called with user-defined functions
  (i.e., functions defined with `(define-private ...)`, `(define-read-only ...)`, or
  `(define-public ...)`) or simple native functions (e.g., `+`, `-`, `not`).
* Functions that return lists of a different size than the input size
  (e.g., `(append-item ...)`) take a required _constant_ parameter that indicates
  the maximum output size of the function. This is enforced with a runtime check.

## Inter-Contract Calls

A smart contract may call functions from other smart contracts using a
`(contract-call?)` function.

This function returns a Response type result-- the return value of the called smart
contract function. Note that if a called smart contract returns an
`err` type, it is guaranteed to not alter any smart contract state
whatsoever. Of course, any transaction fees paid for the execution
of that function will not be returned.

We distinguish 2 different types of `contract-call?`:

* Static dispatch: the callee is a known, invariant contract available
on-chain when the caller contract is being deployed. In this case, the
callee's principal is provided as first argument, followed by the name
of the method and its arguments:

```scheme
(contract-call?
    'SC3H92H297DX3YDPFHZGH90G8Z4NPH4VE8E83YWAQ.registrar
    register-name
    name-to-register)
```

This approach must always be preferred, when adequate.
It makes static analysis easier, and eliminates the
potential for reentrancy bugs when the contracts are
being published (versus when being used).

* Dynamic dispatch: the callee is passed as an argument, and typed
as a trait reference (<A>).

```scheme
(define-public (swap (token-a <can-transfer-tokens>)
                     (amount-a uint)
                     (owner-a principal)
                     (token-b <can-transfer-tokens>)
                     (amount-b uint)
                     (owner-b principal)))
     (begin
         (unwrap! (contract-call? token-a transfer-from? owner-a owner-b amount-a))
         (unwrap! (contract-call? token-b transfer-from? owner-b owner-a amount-b))))
```

Traits can either be locally defined:

```scheme
(define-trait can-transfer-tokens (
    (transfer-from? (principal principal uint) (response uint)))
```

Or imported from an existing contract:

```scheme
(use-trait can-transfer-tokens
    'SC3H92H297DX3YDPFHZGH90G8Z4NPH4VE8E83YWAQ.contract-defining-trait.can-transfer-tokens)
```

Looking at trait conformance, callee contracts have two different paths.
They can either be "compatible" with a trait by defining methods
matching some of the methods defined in a trait, or explicitely declare
conformance using the `impl-trait` statement:

```scheme
(impl-trait 'SC3H92H297DX3YDPFHZGH90G8Z4NPH4VE8E83YWAQ.contract-defining-trait.can-transfer-tokens)
```

Explicit conformance should be prefered when adequate.
It acts as a safeguard by helping the static analysis system to detect
deviations in method signatures before contract deployment.

The following limitations are imposed on contract calls:

1. On static dispatches, callee smart contracts _must_ exist at the time of creation.
2. No cycles may exist in the call graph of a smart contract. This
   prevents recursion (and re-entrancy bugs). Such structures can
   be detected with static analysis of the call graph, and will be
   rejected by the network.
3. `contract-call?` are for inter-contract calls only. Situations
   where the caller is also the callee will result in abortion of
   the ongoing transaction.

## Principals and Owner Verification

The language provides a primitive for checking whether or not the
smart contract transaction was signed by a particular
_principal_. Principals are a specific type in the smart contracting
language which represent a spending entity (roughly equivalent to a
Stacks address). The signature itself is not checked by the smart
contract, but by the VM. A smart contract function can use a globally
defined variable to obtain the current principal:

```scheme
tx-sender
```

The `tx-sender` variable does not change during inter-contract
calls. This means that if a transaction invokes a function in a given
smart contract, that function is able to make calls into other smart
contracts without that variable changing. This enables a wide variety
of applications, but it comes with some dangers for users of smart
contracts. However, as mentioned before, the static analysis
guarantees of our smart contracting language allow clients to know a
priori which functions a given smart contract will ever call.

Another global variable, `contract-caller`, _does_ change during
inter-contract calls. In particular, `contract-caller` is the contract
principal corresponding to the most recent invocation of `contract-call?`.
In the case of a "top-level" invocation, this variable is equal to `tx-sender`.

Assets in the smart contracting language and blockchain are
"owned" by objects of the principal type, meaning that any object of
the principal type may own an asset. For the case of public-key hash
and multi-signature Stacks addresses, a given principal can operate on
their assets by issuing a signed transaction on the blockchain. _Smart
contracts_ may also be principals (reprepresented by the smart
contract's identifier), however, there is no private key associated
with the smart contract, and it cannot broadcast a signed transaction
on the blockchain.

In order to allow smart contracts to operate on assets it owns, smart
contracts may use the special function:

```scheme
(as-contract (...))
```

This function will execute the closure (passed as an argument) with
the `tx-sender` and `contract-caller` set to the _contract's_
principal, rather than the current sender. It returns the return value
of the provided closure. A smart contract may use the special variable
`contract-principal` to refer to its own principal.

For example, a smart contract that implements something like a "token
faucet" could be implemented as so:

```scheme
(define-public (claim-from-faucet)
  (if (is-none? (map-get claimed-before (tuple (sender tx-sender))))
      (let ((requester tx-sender)) ;; set a local variable requester = tx-sender
        (map-insert! claimed-before (tuple (sender requester)) (tuple (claimed true)))
        (as-contract (stacks-transfer! requester 1))))
      (err 1))
```

Here, the public function `claim-from-faucet`:

1. Checks if the sender has claimed from the faucet before
2. Assigns the tx sender to a requester variable
3. Adds an entry to the tracking map
4. Uses `as-contract` to send 1 microstack

The primitive function `is-contract?` can be used to determine
whether a given principal corresponds to a smart contract.

## Stacks Transfer Primitives

To interact with Stacks balances, smart contracts may call the
`(stacks-transfer!)` function. This function will attempt to transfer
from the current principal to another principal:


```scheme
(stacks-transfer!
  to-send-amount
  recipient-principal)
```

This function itself _requires_ that the operation have been signed by
the transferring principal. The `integer` type in our smart contracting
language is an 16-byte signed integer, which allows it to specify the
maximum amount of microstacks spendable in a single Stacks transfer.

Like any other public smart contract function, this function call
returns an `ok` if the transfer was successful, and `err` otherwise.

## Data-Space Primitives

Data within a smart contract's data-space is stored within
`maps`. These stores relate a typed-tuple to another typed-tuple
(almost like a typed key-value store). As opposed to a table data
structure, a map will only associate a given key with exactly one
value. Values in a given mapping are set or fetched using:

1. `(map-get map-name key-tuple)` - This fetches the value
  associated with a given key in the map, or returns `none` if there
  is no such value.
2. `(map-set! map-name key-tuple value-tuple)` - This will set the
  value of `key-tuple` in the data map
3. `(map-insert! map-name key-tuple value-tuple)` - This will set
  the value of `key-tuple` in the data map if and only if an entry
  does not already exist.
4. `(map-delete! map-name key-tuple)` - This will delete `key-tuple`
   from the data map

We chose to use data maps as opposed to other data structures for two
reasons:

1. The simplicity of data maps allows for both a simple implementation
within the VM, and easier reasoning about functions. By inspecting a
given function definition, it is clear which maps will be modified and
even within those maps, which keys are affected by a given invocation.
2. The interface of data maps ensures that the return types of map
operations are _fixed length_, which is a requirement for static
analysis of smart contracts' runtime, costs, and other properties.

A smart contract defines the data schema of a data map with the
`define-map` call. The `define-map` function may only be called in the
top-level of the smart-contract (similar to `define-private`). This
function accepts a name for the map, and a definition of the structure
of the key and value types. Each of these is a list of `(name, type)`
pairs, and they specify the input and output type of `map-get`.
Types are either the values `'principal`, `'integer`, `'bool` or
the output of a call to `(buffer n)`, which defines an n-byte
fixed-length buffer. 

This interface, as described, disallows range-queries and
queries-by-prefix on data maps. Within a smart contract function,
you cannot iterate over an entire map.

### Record Type Syntax

To support the use of _named_ fields in keys and values, our language
allows the construction of named tuples using a function `(tuple ...)`,
e.g.,

```
(define-constant imaginary-number-a (tuple (real 1) (i 2)))
(define-constant imaginary-number-b (tuple (real 2) (i 3)))

```

This allows for creating named tuples on the fly, which is useful for
data maps where the keys and values are themselves named tuples. To
access a named value of a given tuple, the function `(get #name
tuple)` will return that item from the tuple.

### Time-shifted Evaluations

The Stacks language supports _historical_ data queries using the
`(at-block)` function:

```
(at-block 0x0101010101010101010101010101010101010101010101010101010101010101
  ; returns owner principal of name represented by integer 12013
  ;  at the time of block 0x010101...
  (map-get name-map 12013))
```

This function evaluates the supplied closure as if evaluated at the end of
the supplied block, returning the resulting value. The supplied
closure _must_ be read-only (is checked by the analysis).

The supplied block hash must correspond to a known block in the same
fork as the current block, otherwise a runtime error will occur and the
containing transaction will _fail_. Note that if the supplied block
pre-dates any of the data structures being read within the closure (i.e.,
the block is before the block that constructed a data map), a runtime
error will occur and the transaction will _fail_.

## Library Support and Syntactic Sugar

There are a number of ways that the developer experience can be
improved through the careful addition of improved syntax. For example,
while the only atomic types supported by the smart contract language
are integers, buffers, booleans, and principals, so if a developer
wishes to use a buffer to represent a fixed length string, we should
support syntax for representing a buffer literal using something like
an ASCII string. Such support should also be provided by transaction
generation libraries, where buffer arguments may be supplied strings
which are then automatically converted to buffers. There are many
possible syntactic improvements and we expect that over the course
of developing the prototype, we will have a better sense for which
of those improvements we should support. Any such synactic changes
will appear in an eventual language specification, but we believe
them to be out of scope for this proposal.

## Static Analysis

One of the design goals of our smart contracting language was the
ability to statically analyze smart contracts to obtain accurate
upper-bound estimates of transaction costs (i.e., runtime and storage
requirements) as a function of input lengths. By limiting the types
supported, the ability to recurse, and the ability to iterate, we
believe that the language as presented is amenable to such static
analysis based on initial investigations.

The essential step in demonstrating the possibility of accurate and
useful analysis of our smart contract definitions is demonstrating
that any function within the language specification has an output
length bounded by a constant factor of the input length. If we can
demonstrate this, then statically computing runtime or space
requirements involves merely associating each function in the language
specification with a way to statically determine cost as a function of
input length.

Notably, the fact that the cost functions produced by static analysis
are functions of _input length_ means the following things:

1. The cost of a cross-contract call can be "memoized", such
   that a static analyzer _does not_ need to recompute any
   static analysis on the callee when analyzing a caller.
2. The cost of a given public function on a given input size
   _is always the same_, meaning that smart contract developers
   do not need to reason about different cases in which a given
   function may cost more or less to execute.

### Bounding Function Output Length

Importantly, our smart contracting language does not allow the
creation of variable length lists: there are no `list` or
`cons` constructors, and buffer lengths must be statically
defined. Under such requirements (and given that recursion is
illegal), determining the output lengths of functions is rather
directly achievable. To see this, we'll examine trying to compute the
output lengths for the only functions allowed to iterate in the
language:

```
outputLen(map f list<t>)     := Len(list<t>) * outputLen(f t)
outputLen(filter f list<t>)  := Len(list<t>)
outputLen(fold f list<t> s)  := Len(s)
```

Many functions within the language will output values larger than the
function's input, _however_, these outputs will be bound by
statically inferable constants. For example, the data function
_map-get_ will always return an object whose size is equal
to the specified value type of the map.

A complete proof for the static runtime analysis of smart contracts
will be included with the implementation of the language.

## Deploying the Smart Contract

Smart contracts on the Stacks blockchain will be deployed directly as
source code. The goal of the smart contracting language is that the
code of the contract defines the _ground truth_ about the intended
functionality of the contract. While seemingly banal, many systems
chose instead to use a compiler to translate from a friendly
high-level language to a lower-level language deployed on the
blockchain. Such an architecture is needlessly dangerous. A bug in
such a compiler could lead to a bug in a deployed smart contract when
no such bug exists in the original source. This is problematic for
recovery --- a hard fork to "undo" any should-have-been invalid
transactions would be contentious and potentially create a rift in the
community, especially as it will not be easy to deduce which contracts
exactly were affected and for how long. In contrast, bugs in the VM
itself present a more clear case for a hard fork: the smart contract
was defined correctly, as everyone can see directly on the chain, but
illegal transactions were incorrectly marked as valid.

## Virtual Machine API

From the perspective of other components of `blockstack-core`, the
smart contracting VM will provide the following interface:

```
connect-to-database(db)

publish-contract(
  contract-source-code)

  returns: contract-identifier

execute-contract(
  contract-identifier,
  transaction-name,
  sender-principal,
  transaction-arguments)

  returns: true or false if the transaction executed successfully
```

## Invocation and Static Analysis

When processing a client transaction, a `blockstack-core` node will do
one of two things, depending on whether that transaction is a contract
function invocation, or is attempting to publish a new smart contract.

### Contract function invocation

Any transaction which invokes a smart contract will be included in the
blockchain. This is true even for transactions which are
_invalid_. This is because _validating_ an invalid transaction is not
a free operation. The only exceptions to this are transactions which
do not pay more than either a minimum fee or a storage fee
corresponding to the length of the transaction. Transactions which do
not pay a storage fee and clear the minimum transaction fee are
dropped from the mempool.

To process a function invocation, `blockstack-core` does the following:

1. Get the balance of the sender's account. If it's less than the tx fee,
then `RETURN INVALID`.
2. Otherwise, debit the user's account by the tx fee.
3. Look up the contract by hash. If it does not exist, then `RETURN
   INVALID`.
4. Look up the contract's `define-public` function and compare the
   tx's arguments against it. If the tx does not call an existing
   method, or supplies invalid arguments, then `RETURN INVALID`.
5. Look up the cost to execute the given function, and if it is greater
   than the paid tx fee, `RETURN INVALID`.
6. Execute the public function code and commit the effects of running
   the code and `RETURN OK`

### Publish contract

A transaction which creates a new smart contract must pay a fee which
funds the static analysis required to determine the cost of the new
smart contract's public functions. To process such a transaction,
`blockstack-core` will:

1. Check the sender's account balance. If zero, then `RETURN INVALID`
2. Check the tx fee against the user's balance. If it's higher, then `RETURN INVALID`
3. Debit the tx fee from the user's balance.
4. Check the syntax, calculating the fee of verifying each code
   item. If the cost of checking the next item exceeds the tx fee, or
   if the syntax is invalid, then `RETURN INVALID`.
5. Build the AST, and assign a fee for adding each AST item. If the
   cost of adding the next item to the tree exceeds the tx fee (or if
   the AST gets too big), then `RETURN INVALID`.
6. Walk the AST. Each step in the walk incurs a small fee. Do the
   following while the tx fee is higher than the total cost incurred
   by walking to the next node in the AST:
   a. If the next node calls a contract method, then verify that
      the contract exists and the method arguments match the contract's
      `define-public` signature. If not, then `RETURN INVALID`.
   b. Compute the runtime cost of each node in the AST, adding it
      to the function's cost analysis.
7. Find all `define-map` calls to find all tables that need to
   exist. Each step in this incurs a small fee.
8. Create all the tables if the cost of creating them is smaller than
   the remaining tx fee. If not, then RETURN INVALID.
9. `RETURN OK`

## Database Requirements and Transaction Accounting

The smart contract VM needs to interact with a database somewhat
directly: the effects of an `map-insert!` or `map-set!` call are
realized later in the execution of the same transaction. The database
will need to support fairly fine-grained rollbacks as some contract
calls within a transaction's execution may fail, triggering a
rollback, while the transaction execution continues and successfully
completes other database operations.

The database API provided to the smart contract VM, therefore, must be
capable of (1) quickly responding to `map-get` queries, which are
essentially simply key-value _gets_ on the materialized view of the
operation log. The operation log itself is simply a log of the
`map-insert!` and `map-set!` calls. In addition to these
operations, the smart contract VM will be making token transfer calls.
The databasse log should track those operations as well.

In order to aid in accounting for the database operations created by a
given transaction, the underlying database should store, with each
operation entry, the corresponding transaction identifier. This will
be expanded in a future SIP to require the database to store enough
information to reconstruct each block, such that the blocks can be
relayed to bootstrapping peers.

## Clarity Type System

### Types

The Clarity language uses a strong static type system. Function arguments
and database schemas require specified types, and use of types is checked
during contract launch. The type system does _not_ have a universal
super type. The type system contains the following types:

* `(tuple (key-name-0 key-type-0) (key-name-1 key-type-1) ...)` -
  a typed tuple with named fields.
* `(list max-len entry-type)` - a list of maximum length `max-len`, with
  entries of type `entry-type`
* `(response ok-type err-type)` - object used by public functions to commit
  their changes or abort. May be returned or used by other functions as
  well, however, only public functions have the commit/abort behavior.
* `(optional some-type)` - an option type for objects that can either be
  `(some value)` or `none`
* `(buff max-len)` := byte buffer or maximum length `max-len`.
* `principal` := object representing a principal (whether a contract principal
  or standard principal).
* `bool` := boolean value (`true` or `false`)
* `int`  := signed 128-bit integer
* `uint` := unsigned 128-bit integer

### Type Admission

**UnknownType**. The Clarity type system does not allow for specifying
an "unknown" type, however, in type analysis, unknown types may be
constructed and used by the analyzer. Such unknown types are used
_only_ in the admission rules for `response` and `optional` types
(i.e., the variant types).

Type admission in Clarity follows the following rules:

* Types will only admit objects of the same type, i.e., lists will only
admit lists, tuples only admit tuples, bools only admit bools.
* A tuple type `A` admits another tuple type `B` iff they have the exact same
  key names, and every key type of `A` admits the corresponding key type of `B`.
* A list type `A` admits another list type `B` iff `A.max-len >= B.max-len` and
  `A.entry-type` admits `B.entry-type`.
* A buffer type `A` admits another buffer type `B` iff `A.max-len >= B.max-len`.
* An optional type `A` admits another optional type `B` iff:
  * `A.some-type` admits `B.some-type` _OR_ `B.some-type` is an unknown type:
    this is the case if `B` only ever corresponds to `none`
* A response type `A` admits another response type `B` if one of the following is true:
  * `A.ok-type` admits `B.ok-type` _AND_ `A.err-type` admits `B.err-type`
  * `B.ok-type` is unknown _AND_ `A.err-type` admits `B.err-type`
  * `B.err-type` is unknown _AND_ `A.ok-type` admits `B.ok-type`
* Principals, bools, ints, and uints only admit types of the exact same type.

Type admission is used for determining whether an object is a legal argument for
a function, or for insertion into the database. Type admission is _also_ used
during type analysis to determine the return types of functions. In particular,
a function's return type is the least common supertype of each type returned from any
control path in the function. For example:

```
(define-private (if-types (input bool))
  (if input
     (ok 1)
     (err false)))
```

The return type of `if-types` is the least common supertype of `(ok
1)` and `(err false)` (i.e., the most restrictive type that contains
all returns). In this case, that type `(response int bool)`. Because
Clarity _does not_ have a universal supertype, it may be impossible to
determine such a type. In these cases, the functions are illegal, and
will be rejected during type analysis.

## Measuring Transaction Costs for Fee Collection

Our smart contracting language admits static analysis to determine
many properties of transactions _before_ executing those
transactions. In particular, it allows for the VM to count the total
number of runtime operations required, the maximum amount of database
writes, and the maximum number of calls to any expensive primitive
functions like database reads or hash computations. Translating that
information into transaction costs, however, requires more than simply
counting those operations. It requires translating the operations into
a single cost metric (something like gas in Ethereum). Then, clients
can set the fee rate for that metric, and pay the corresponding
transaction fee. Notably, unlike Turing-complete smart contracting
languages, any such fees are known _before_ executing the transaction,
such that clients will no longer need to estimate gas fees. They will,
however, still need to estimate fee rates (much like Bitcoin clients
do today).

Developing such a cost metric is an important task that has
significant consequences. If the metric is a bad one, it could open up
the possibility of denial-of-service attacks against nodes in the
Stacks network. We leave the development of a cost metric to another
Stacks Improvement Proposal, as we believe that such a metric should
be designed by collecting real benchmarking data from something close
to a real system (such measurements will likely be collected through
a combination of hand-crafted benchmarks and fuzzing test suites).

### Maximum Operation Costs and Object Sizes

Even with a cost metric, it is a good idea to set maximums for the
cost of an operation, and the size of objects (like
buffers). Developing good values for constants such as maximum number
of database reads or writes per transaction, maximum size of buffers,
maximum number of arguments to a tuple, maximum size of a smart
contract definition, etc. is a process much like developing a
cost metric--- this is something best done in tandem with the 
production of a prototype. However, we should note that we do intend
to set such limits.


## Example: Simple Naming System

To demonstrate the expressiveness of this smart contracting language,
let's look at an example smart contract which implements a simple
naming system with just two kinds of transactions: _preorder_ and
_register_. The requirements of the system are as follows:

1. Names may only be owned by one principal
2. A register is only allowed if there is a corresponding preorder
   with a matching hash
3. A register transaction must be signed by the same principal who
   paid for the preorder
4. A preorder must have paid at least the price of the name. Names
   are represented as integers, and any name less than 100000 costs
   1000 microstacks, while all other names cost 100 microstacks.
5. Preorder hashs are _globally_ unique.

In this simple scheme, names are represented by integers, but in
practice, a buffer would probably be used.

```scheme
(define-constant burn-address '1111111111111111111114oLvT2)
(define-private (price-function name)
  (if (< name 1e5) 1000 100))

(define-map name-map 
  { name: uint } { buyer: principal })
(define-map preorder-map
  { name-hash: (buff 160) }
  { buyer: principal, paid: uint })

(define-public (preorder 
               (name-hash (buffer 20))
               (name-price integer))
  (if (and (is-ok? (stacks-transfer!
                    name-price burn-address))
           (map-insert! preorder-map
            (tuple (name-hash name-hash))
            (tuple (paid name-price)
                   (buyer tx-sender))))
      (ok 0)
      (err 1)))

(define-public (register 
               (recipient-principal principal)
               (name integer)
               (salt integer))
  (let ((preorder-entry
          (map-get preorder-map
                         (tuple (name-hash (hash160 name salt)))))
        (name-entry 
          (map-get name-map (tuple (name name)))))
    (if (and
         ;; must be preordered
         (not (is-none? preorder-entry))
         ;; name shouldn't *already* exist
         (is-none? name-entry)
         ;; preorder must have paid enough
         (<= (price-funcion name)
             (default-to 0 (get paid preorder-entry)))
         ;; preorder must have been the current principal
         (eq? tx-sender
              (expects! (get buyer preorder-entry) (err 1)))
         (map-insert! name-table
           (tuple (name name))
           (tuple (owner recipient))))
         (ok 0)
         (err 1))))
```


Note that Blockstack PBC intends to supply a full BNS (Blockstack
Naming System) smart contract, as well as formal proofs that certain
desirable properties hold (e.g. "names are globally unique", "a
revoked name cannot be updated or transferred", "names cost stacks
based on their namespace price function", "only the principal can
reveal a name on registration", etc.).

# Related Work

Smart contract languages are not new at the time of this writing.  By far the
most well-known one at this time is Solidity [1], a Turing-complete smart
contract programming language for the Ethereum blockchain [2].  Solidity is
compiled, which makes it hard to determine whether or not any differences
between the contract's behavior and its expected behavior are due to bugs in the
source code, the compiler, or the EVM itself.  Clarity is interpreted, so any
bugs that cannot be attributed to a Clarity contract's source code must be due
to bugs in the blockchain itself.  Removing this ambiguity is important for
determining how to triage such problems.  A bug in the runtime system would
justifiably be fixed with a backwards-incompatible change, whereas a bug in the
compiler may not be.

Clarity is decidable, which removes the need for implementing an "out-of-gas"
error condition that is common in Turing-complete smart contract languages.
Clarity programs either run to completion if they do not fail static analysis
checks, or the blockchain transactions that invoke them are never mined in the
first place.

There are many other smart contract programming languages with different design
goals than Clarity.  This section deserves future expansion, and may be added to
after this SIP is ratified.  

[1] Solidity Language.  https://docs.soliditylang.org/en/v0.8.0/
[2] Ethereum blockchain.  https://ethereum.github.io/yellowpaper/paper.pdf

# Backwards Compatibility

Not applicable

# Activation

At least 20 miners must register a name in the `.miner` namespace in Stacks 1.0.
Once the 20th miner has registered, the state of Stacks 1.0 will be snapshotted.
300 Bitcoin blocks later, the Stacks 2.0 blockchain will launch.  With Stacks
2.0 will come the Clarity VM.

# Reference Implementations

The frst reference implementation can be found at
https://github.com/blockstack/stacks-blockchain.



================================================
FILE: sips/sip-004/sip-004-materialized-view.md
================================================
# Preamble

SIP Number: 004

Title: Cryptographic Commitment to Materialized Views

Author: Jude Nelson <jude@stacks.org>

Consideration: Technical

Type: Consensus

Status: Ratified

Created: 15 July 2019

License: BSD 2-Clause

Sign-off: Jude Nelson <jude@stacks.org>, Technical Steering Committee Chair

Discussions-To: https://github.com/stacksgov/sips

# Abstract

Blockchain peers are replicated state machines, and as such, must maintain a
materialized view of all of the state the transaction log represents in order to
validate a subsequent transaction.  The Stacks blockchain in particular not only
maintains a materialized view of the state of every fork, but also requires
miners to cryptographically commit to that view whenever they mine a block.
This document describes a **Merklized Adaptive Radix Forest** (MARF), an
authenticated index data structure for efficiently encoding a 
cryptographic commitment to blockchain state.

The MARF's structure is part of the consensus logic in the Stacks blockchain --
every Stacks peer must process the MARF the same way.  Stacks miners announce
a cryptographic hash of their chain tip's MARF in the blocks they produce, and in
doing so, demonstrate to each peer and each light client that they have 
applied the block's transactions to the peer's state correctly.

The MARF represents blockchain state as an authenticated directory.  State is
represented as key/value pairs.  The MARF structure gives a peer the ability to
prove to a light client that a particular key has a particular value, given the
MARF's cryptographic hash.  The proof has _O(log B)_ space for _B_ blocks, and
takes _O(log B)_ time complexity to produce and verify.  In addition, it offers
_O(1)_ expected time and space complexity for inserts and queries.
The MARF proof allows a light client to determine:

* What the value of a particular key is,
* How much cumulative energy has been spent to produce the key/value pair,
* How many confirmations the key/value pair has.

# Introduction

In order to generate a valid transaction, a blockchain client needs to be able
to query the current state of the blockchain.  For example, in Bitcoin, a client
needs to query its unspent transaction outputs (UTXOs) in order to satisfy their
spending conditions in a new transaction.  As another example, in Ethereum, a
client needs to query its accounts' current nonces in order to generate a valid
transaction to spend their tokens.

Whether or not a blockchain's peers are required to commit to the current state
in the blocks themselves (i.e. as part of the consensus logic) is a
philosophical decision.  We argue that it is a highly desirable in Blockstack's
case, since it affords light clients more security when querying the blockchain state than
not.  This is because a client often queries state that was last updated several
blocks in the past (i.e. and is "confirmed").  If a blockchain peer can prove to
a client that a particular key in the state has a particular value, and was last
updated a certain number of blocks in the past, then the client can determine
whether or not to trust the peer's proof based on factors beyond simply trusting
the remote peer to be honest.  In particular, the client can determine how
difficult it would be to generate a dishonest proof, in terms of the number of
blocks that would need to be maliciously crafted and accepted by the network.
This offers clients some protection against peers that would lie to them -- a
lying peer would need to spend a large amount of energy (and money) in order to
do so.

Specific to Blockstack, we envision that many applications will run
their own Stacks-based blockchain peer networks that operate "on top" of the
Stacks blockchain through proof-of-burn.  This means that the Blockstack
application ecosystem will have many parallel "app chains" that users may wish
to interact with.  While a cautious power user may run validator nodes for each
app chain they are interested in, we expect that most users will not do so,
especially if they are just trying out the application or are casual users.  In
order to afford these users better security than simply telling them to find a
trusted validating peer, it is essential that each Stacks peer commits to its
materialized view in each block.

On top of providing better security to light clients, committing to the materialized
state view in each block has the additional benefit of helping the peer network
detect malfunctioning miners early on.  A malfunctioning miner will calculate a
different materialized view using the same transactions, and with overwhelmingly
high probability, will also calculate a different state view hash.  This makes
it easy for a blockchain's peers to reject a block produced in this manner
outright, without having to replay its transactions.

## Design Considerations

Committing to the materialized view in each block has a non-zero cost in terms
of time and space complexity.  This cost is paid for by the transaction fee, but
it effectively sets an upper bound on how many key/value insertions can happen
per block -- in particular, generating and validating the block must be faster
than the underlying burnchain block times. This means that it
is of paramount importance to keep the materialized view digest calculation as
fast as possible.

The following considerations have a non-trivial impact on the design of the
MARF:

**A transaction can read or write any prior state in the same fork.**  This
means that the index must support fast random-access reads and fast
random writes.

**The Stacks blockchain can fork, and a miner can produce a fork at any block
height in the past.**  As argued in SIP 001, a Stacks blockchain peer must process
all forks and keep their blocks around.  This also means that a peer needs to
calculate and validate the materialized view of each fork, no matter where it
occurs.  This is also necessary because a client may request a proof for some
state in any fork -- in order to service such requests, the peer must calculate
the materialized view for all forks.

**Forks can occur in any order, and blocks can arrive in any order.**  As such,
the runtime cost of calculating the materialized view must be _independent_ of the
order in which forks are produced, as well as the order in which their blocks
arrive.  This is required in order to avoid denial-of-service vulnerabilities,
whereby a network attacker can control the schedules of both
forks and block arrivals in a bid to force each peer to expend resources
validating the fork.  It must be impossible for an attacker to
significantly slow down the peer network by maliciously varying either schedule.
This has non-trivial consequences for the design of the data structures for
encoding materialized views.

# Specification

The Stacks peer's materialized view is realized as a flat key/value store.
Transactions encode zero or more creates, inserts, updates, and deletes on this
key/value store.  As a consequence of needing to support forks from any prior block,
no data is ever removed; instead, a "delete" on a particular key is encoded 
by replacing the value with a tombstone record.  The materialized view is the
subset of key/value pairs that belong to a particular fork in the blockchain.

The Stacks blockchain separates the concern of maintaining _authenticated
index_ over data from storing a copy of the data itself.  The blockchain peers
commit to the digest of the authenticated index, but can store the data however
they want.  The authenticated index is realized as a _Merklized Adaptive Radix
Forest_ (MARF).  The MARF gives Stacks peers the ability to prove that a
particular key in the materialized view maps to a particular value in a
particular fork.

A MARF has two principal data structures:  a _merklized adaptive radix trie_
for each block and a _merklized skip-list_ that
cryptographically links merklized adaptive radix tries in prior blocks to the
current block.

## Merklized Adaptive Radix Tries (ARTs)

An _adaptive radix trie_ (ART) is a prefix tree where each node's branching
factor varies with the number of children.  In particular, a node's branching
factor increases according to a schedule (0, 4, 16, 48, 256) as more and more
children are added.  This behavior, combined with the usual sparse trie
optimizations of _lazy expansion_ and _path compression_, produce a tree-like
index over a set key/value pairs that is _shallower_ than a perfectly-balanced
binary search tree over the same values.  Details on the analysis of ARTs can
be found in [1].

To produce an _index_ over new state introduced in this block, the Stacks peer
will produce an adaptive radix trie that describes each key/value pair modified.
In particular, for each key affected by the block, the Stacks peer will:
* Calculate the hash of the key to get a fixed-length trie path,
* Store the new value and this hash into its data store,
* Insert or update the associated value hash in the block's ART at the trie path,
* Calculate the new Merkle root of the ART by hashing all modified intermediate
  nodes along the path.

In doing so, the Stacks peer produces an authenticated index for all key/value
pairs affected by a block.  The leaves of the ART are the hashes of the values,
and the hashes produced in each intermediate node and root give the peer a
way to cryptographically prove that a particular value is present in the ART
(given the root hash and the key).

The Stacks blockchain employs _path compression_ and _lazy expansion_
to efficiently represent all key/value pairs while minimizing the number of trie
nodes.  That is, if two children share a common prefix, the prefix bytes are
stored in a single intermediate node instead of being spread across multiple
intermediate nodes (path compression).  In the special case where a path suffix
uniquely identifies the leaf, the path suffix will be stored alongside the leaf
instead as a sequence of intermediate nodes (lazy expansion).  As more and more
key/value pairs are inserted, intermediate nodes and leaves with multi-byte
paths will be split into more nodes.

**Trie Structure**

A trie is made up of nodes with radix 4, 16, 48, or 256, as well as leaves.  In
the documentation below, these are called `node4`, `node16`, `node48`,
`node256`, and `leaf` nodes.  An empty trie has a single `node256` as its root.
Child pointers occupy one byte.

**Notation**

The notation `(ab)node256` means "a `node256` who descends from its parent via
byte 0xab".

The notation `node256[path=abcd]` means "a `node256` that has a shared prefix
with is children `abcd`".

**Lazy Expansion**

If a leaf has a non-zero-byte path suffix, and another leaf is inserted that
shares part of the suffix, the common bytes will be split off of the existing
leaf to form a `node4`, whose two immediate children are the two leaves.  Each
of the two leaves will store the path bytes that are unique to them.  For
example, consider this trie with a root `node256` and a single leaf, located at
path `aabbccddeeff00112233` and having value hash `123456`:

```
node256
       \
        (aa)leaf[path=bbccddeeff00112233]=123456
```

If the peer inserts the value hash `98765` at path `aabbccddeeff998877`, the
single leaf's path will be split into a shared prefix and two distinct suffixes,
as follows:

```
insert (aabbccddeeff998877, 98765)

node256                            (00)leaf[path=112233]=123456
       \                          /
        (aa)node4[path-bbccddeeff]
                                  \
                                   (99)leaf[path=887766]=98765
```

Now, the trie encodes both `aabbccddeeff00112233=123456` and
`aabbccddeeff99887766=98765`.

**Node Promotion**

As a node with a small radix gains children, it will eventually need to be
promoted to a node with a higher radix.  A `node4` will become a `node16` when
it receives its 5th child; a `node16` will become a `node48` when it receives
its 17th child, and a `node48` will become a `node256` when it receives its 49th
child.  A `node256` will never need to be promoted, because it has slots for
child pointers with all possible byte values.

For example, consider this trie with a `node4` and 4 children:

```
node256                                (00)leaf[path=112233]=123456
       \                              /
        \                            /  (01)leaf[path=445566]=67890
         \                          /  /
          (aa)node4[path=bbccddeeff]---
                                    \  \
                                     \  (02)leaf[path=778899]=abcdef
                                      \
                                       (99)leaf[path=887766]=98765
```

This trie encodes the following:
   * `aabbccddeeff00112233=123456`
   * `aabbccddeeff01445566=67890`
   * `aabbccddeeff02778899=abcdef`
   * `aabbccddeeff99887766=9876`

Inserting one more node with a prefix `aabbccddeeff` will promote the
intermediate `node4` to a `node16`:

```
insert (aabbccddeeff03aabbcc, 314159)

node256                                 (00)leaf[path=112233]=123456
       \                               /
        \                             /  (01)leaf[path=445566]=67890
         \                           /  /
          (aa)node16[path=bbccddeeff]-----(03)leaf[path=aabbcc]=314159
                                     \  \
                                      \  (02)leaf[path=778899]=abcdef
                                       \
                                        (99)leaf[path=887766]=98765
```

The trie now encodes the following:
   * `aabbccddeeff00112233=123456`
   * `aabbccddeeff01445566=67890`
   * `aabbccddeeff03aabbcc=314159`
   * `aabbccddeeff02778899=abcdef`
   * `aabbccddeeff99887766=9876`

**Path Compression**

Intermediate nodes, such as the `node16` in the previous example, store path
prefixes shared by all of their children.  If a node is inserted that shares
some of this prefix, but not all of it, the path is "decompressed" -- a new
leaf is "spliced" into the compressed path, and attached to a `node4` whose two
children are the leaf and the existing node (i.e. the `node16` in this case)
whose shared path now contains the suffix unique to its children, but distinct
from the newly-spliced leaf.

For example, consider this trie with the intermediate `node16` sharing a path
prefix `bbccddeeff` with its 5 children:

```
node256                                 (00)leaf[path=112233]=123456
       \                               /
        \                             /  (01)leaf[path=445566]=67890
         \                           /  /
          (aa)node16[path=bbccddeeff]-----(03)leaf[path=aabbcc]=314159
                                     \  \
                                      \  (02)leaf[path=778899]=abcdef
                                       \
                                        (99)leaf[path=887766]=98765
```

This trie encodes the following:
   * `aabbccddeeff00112233=123456`
   * `aabbccddeeff01445566=67890`
   * `aabbccddeeff03aabbcc=314159`
   * `aabbccddeeff02778899=abcdef`
   * `aabbccddeeff99887766=9876`

If we inserted `(aabbcc001122334455, 21878)`, the `node16`'s path would be
decompressed to `eeff`, a leaf with the distinct suffix `1122334455` would be spliced
in via a `node4`, and the `node4` would have the shared path prefix `bbcc` with
its now-child `node16` and leaf.

```
insert (aabbcc00112233445566, 21878)

                               (00)leaf[path=112233445566]=21878
                              /
node256                      /                       (00)leaf[path=112233]=123456
       \                    /                       /
        (aa)node4[path=bbcc]                       /  (01)leaf[path=445566]=67890
                            \                     /  /
                             (dd)node16[path=eeff]-----(03)leaf[path=aabbcc]=314159
                                                  \  \
                                                   \  (02)leaf[path=778899]=abcdef
                                                    \
                                                     (99)leaf[path=887766]=98765
```

The resulting trie now encodes the following:
   * `aabbcc00112233445566=21878`
   * `aabbccddeeff00112233=123456`
   * `aabbccddeeff01445566=67890`
   * `aabbccddeeff03aabbcc=314159`
   * `aabbccddeeff02778899=abcdef`
   * `aabbccddeeff99887766=9876`

## Back-pointers

The materialized view of a fork will hold key/value pairs for data produced by
applying _all transactions_ in that fork, not just the ones in the last block.  As such,
the index over all key/value pairs in a fork is encoded in the sequence of 
its block's merklized ARTs.

To ensure that random reads and writes on the a fork's materialized view remain
fast no matter which block added them, a child pointer in an ART can point to
either a node in the same ART, or a node with the same path in a prior ART.  For
example, if the ART at block _N_ has a `node16` whose path is `aabbccddeeff`, and 10
blocks ago a leaf was inserted at path `aabbccddeeff99887766`, it will
contain a child pointer to the intermediate node from 10 blocks ago whose path is
`aabbccddeeff` and who has a child node in slot `0x99`.  This information is encoded
as a _back-pointer_.  To see it visually:

```
At block N


node256                                 (00)leaf[path=112233]=123456
       \                               /
        \                             /  (01)leaf[path=445566]=67890
         \                           /  /
          (aa)node16[path=bbccddeeff]-----(03)leaf[path=aabbcc]=314159
                                     \  \
                                      \  (02)leaf[path=778899]=abcdef
                                       \
                                        |
                                        |
                                        |
At block N-10 - - - - - - - - - - - - - | - - - - - - - - - - - - - - - - - - -
                                        |
node256                                 | /* back-pointer to block N-10 */
       \                                |
        \                               |
         \                              |
          (aa)node4[path=bbccddeeff]    |
                                    \   |
                                     \  |
                                      \ |
                                       (99)leaf[path=887766]=98765
```

By maintaining trie child pointers this way, the act of looking up a path to a value in
a previous block is a matter of following back-pointers to previous tries.
This back-pointer uses the _block-hash_ of the previous block to uniquely identify
the block. In order to keep the in-memory and on-disk representations of trie nodes succint,
the MARF structure uses a locally defined unsigned 32-bit integer to identify the previous 
block, along with a local mapping of such integers to the respective block header hash.

Back-pointers are calculated in a copy-on-write fashion when calculating the ART
for the next block.  When the root node for the ART at block N+1 is created, all
of its children are set to back-pointers that point to the immediate children of
the root of block N's ART.  Then, when inserting a key/value pair, the peer
walks the current ART to the insertion point, but whenever a
back-pointer is encountered, it copies the node it points to into the current
ART, and sets all of its non-empty child pointers to back-pointers.  The peer
then continues traversing the ART until the insertion point is found (i.e. a
node has an unallocated child pointer where the leaf should go), copying
over intermediate nodes lazily.

For example, consider the act of inserting `aabbccddeeff00112233=123456` into an
ART where a previous ART contains the key/value pair
`aabbccddeeff99887766=98765`:

```
At block N


node256                                (00)leaf[path=112233]=123456
^      \                              /
|       \                            /
|        \                          /
|         (aa)node4[path=bbccddeeff]
|                 ^                 \
|                 |                  \
| /* 1. @root. */ | /* 2. @node4.  */ \  /* 3. 00 is empty, so insert */
| /* copy up, &*/ | /* copy up, &  */  |
| /* make back-*/ | /* make back-  */  |
| /* ptr to aa */ | /* ptr to 99   */  |
|                 |                    |
|- At block N-10 -|- - - - - - - - - - | - - - - - - - - - - - - - - - - - -
|                 |                    |
node256           |                    |
       \          |                    |
        \         |                    |
         \        |                    |
          (aa)node4[path=bbccddeeff]   |
                                    \  |
                                     \ |
                                      \|
                                       (99)leaf[path=887766]=98765
```

In step 1, the `node256` in block _N_ would have a back-pointer to the `node4` in
block _N - 10_ in child slot `0xaa`.  While walking path `aabbccddeeff00112233`,
the peer would follow slot `0xaa` to the `node4` in block _N - 10_ and copy it
into block _N_, and would set its child pointer at `0x99` to be a back-pointer
to the `leaf` in block _N - 10_.  It would then step to the `node4` it copied,
and walk path bytes `bbccddeeff`.  When it reaches child slot `0x00`, the peer
sees that it is unallocated, and attaches the leaf with the unexpanded path
suffix `112233`.  The back-pointer to `aabbccddeeff99887766=98765` is thus
preserved in block _N_'s ART.

**Calculating the Root Hash with Back-pointers**

For reasons that will be explained in a moment, the hash of a child node that is a
back-pointer is not calculated the usual way when calculating the root hash of
the Merklized ART.  Instead of taking the hash of the child node (as would be
done for a child in the same ART), the hash of the _block header_ is used
instead.  In the above example, the hash of the `leaf` node whose path is
`aabbccddeeff99887766` would be the hash of block _N - 10_'s header, whereas the
hash of the `leaf` node whose path is `aabbccddeeff00112233` would be the hash
of the value hash `123456`.

The main reason for doing this is to keep block validation time down by a
significant constant factor.  The block header hash is always kept in RAM,
but at least one disk seek is required to read the hash of a child in a separate
ART (and it often takes more than one seek). This does not sacrifice the security
of a Merkle proof of `aabbccddeeff99887766=98765`, but it does alter the mechanics
of calculating and verifying it.

## Merklized Skip-list

The second principal data structure in a MARF is a Merklized skip-list encoded
from the block header hashes and ART root hashes in each block.  The hash of the
root node in the ART for block _N_ is derived not only from the hash of the
root's children, but also from the hashes of the block headers from blocks
`N - 1`, `N - 2`, `N - 4`, `N - 8`, `N - 16`, and so on.  This constitutes
a _Merklized skip-list_ over the sequence of ARTs.

The reason for encoding the root node's hash this way is to make it possible for
peers to create a cryptographic proof that a particular key maps to a particular
value when the value lives in a prior block, and can only be accessed by
following one or more back-pointers.  In addition, the Merkle skip-list affords
a client _two_ ways to verify key-value pairs:  the client only needs either (1)
a known-good root hash, or (2) the sequence of block headers for the Stacks
chain and its underlying burn chain.  Having (2) allows the client to determine
(1), but calculating (2) is expensive for a client doing a small number of
queries.  For this reason, both options are supported.

### Resolving Block Height Queries

For a variety of reasons, the MARF structure must be able to resolve
queries mapping from block heights (or relative block heights) to
block header hashes and vice-versa --- for example, the Clarity VM
allows contracts to inspect this information. Most applicable to the
MARF, though, is that in order to find the ancestor hashes to include
in the Merklized Skip-list, the data structure must be able to find
the block headers which are 1, 2, 4, 8, 16, ... blocks prior in the
same fork. This could be discovered by walking backwards from the
current block, using the previous block header to step back through
the fork's history. However, such a process would require _O(N)_ steps
(where _N_ is the current block height). But, if a mapping exists for
discovering the block at a given block height, this process would instead
be _O(1)_ (because a node will have at most 32 such ancestors).

But correctly implementing such a mapping is not trivial: a given
height could resolve to different blocks in different forks. However,
the MARF itself is designed to handle exactly these kinds of
queries. As such, at the beginning of each new block, the MARF inserts
into the block's trie two entries:

1. This block's block header hash -> this block's height.
2. This block's height -> this block's block header hash.

This mapping allows the ancestor hash calculation to proceed.

## MARF Merkle Proofs

A Merkle proof for a MARF is constructed using a combination of two types of
sub-proofs:  _segment proofs_, and _shunt proofs_.  A _segment proof_ is a proof
that a node belongs to a particular Merklized ART.  It is simply a Merkle tree
proof.  A _shunt proof_ is a proof that the ART for block _N_ is exactly _K_
blocks away from the ART at block _N - K_.  It is generated as a Merkle proof
from the Merkle skip-list.

Calculating a MARF Merkle proof is done by first calculating a segment proof for a
sequence of path prefixes, such that all the nodes in a single prefix are in the
same ART.  To do so, the node walks from the current block's ART's root node
down to the leaf in question, and each time it encounters a back-pointer, it
generates a segment proof from the _currently-visited_ ART to the intermediate
node whose child is the back-pointer to follow.  If a path contains _i_
back-pointers, then there will be _i+1_ segment proofs.

Once the peer has calculated each segment proof, it calculates a shunt proof
that shows that the _i+1_th segment was reached by walking back a given number
of blocks from the _i_th segment by following the _i_th segment's back-pointer.
The final shunt proof for the ART that contains the leaf node includes all of
the prior block header hashes that went into producing its root node's hash.
Each shunt proof is a sequence of sequences of block header hashes and ART root
hashes, such that the hash of the next ART root node can be calculated from the
previous sequence.

For example, consider the following ARTs:

```
At block N


node256                                 (00)leaf[path=112233]=123456
       \                               /
        \                             /  (01)leaf[path=445566]=67890
         \                           /  /
          (aa)node16[path=bbccddeeff]-----(03)leaf[path=aabbcc]=314159
                                     \  \
                                      \  (02)leaf[path=778899]=abcdef
                                       \
                                        |
                                        |
                                        |
At block N-10 - - - - - - - - - - - - - | - - - - - - - - - - - - - - - - - - -
                                        |
node256                                 | /* back-pointer to N - 10 */
       \                                |
        \                               |
         \                              |
          (aa)node4[path=bbccddeeff]    |
                                    \   |
                                     \  |
                                      \ |
                                       (99)leaf[path=887766]=98765
```

To generate a MARF Merkle proof, the client queries a Stacks peer for a
particular value hash, and then requests the peer generate a proof that the key
and value must have been included in the calculation of the current block's ART
root hash (i.e. the digest of the materialized view of this fork). 

For example, given the key/value pair `aabbccddeeff99887766=98765` and the hash
of the ART at block _N_, the peer would generate two segment proofs for the
following paths: `aabbccddeeff` in block _N_, and `aabbccddeeff99887766` in
block `N - 10`.

```
At block N


node256
       \   /* this segment proof would contain the hashes of all other */
        \  /* children of the root, except for the one at 0xaa.        */
         \
          (aa)node16[path=bbccddeeff]

At block N-10 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

node256    /* this segment proof would contain two sequences of hashes: */
       \   /* the hashes for all children of the root besides 0xaa, and */
        \  /* the hashes of all children of the node4, except 0x99.     */
         \
          (aa)node4[path=bbccddeeff]
                                    \
                                     \
                                      \
                                       (99)leaf[path=887766]=98765
```

Then, it would calculate two shunt proofs.  The first proof, called the "head shunt proof,"
supplies the sequence of block hashes for blocks _N - 11, N - 12, N - 14, N - 18, N - 26, ..._ and the 
hash of the children of the root node of the ART for block _N - 10_.  This lets the 
client calculate the hash of the root of the ART at block _N - 10_.  The second
shunt proof (and all subsequent shunt proofs, if there are more back-pointers to
follow) is comprised of the hashes that "went into" calculating the hashes on the
skip-list from the next segment proof's root hash.

In detail, the second shunt proof would have two parts:

* the block header hashes for block _N - 9_ _N - 12_, _N - 16_, _N - 24_, ...
* the block header hashes for _N - 1_, _N - 2_, _N - 4_, _N - 16_, _N - 32_, ...

The reason there are two sequences in this shunt proof is because "walking back"
from block _N_ to block _N - 10_ requires walking first to block _N - 8_ (i.e.
following the skip-list column for 2 ** 3), and then walking to block _N - 10_
from _N - 8_ (i.e. following its skip-list column for 2 ** 1).  The first segment
proof (i.e. with the leaf) lets the client calculate the hash of the children of
the ART root node in block _N - 10_, which when combined with the first part of
this shunt proof yields the ART root hash for _N - 8_.  Then, the client
uses the hash of the children of the root node in the ART of block _N_ (calculated from the second segment
proof), combined with the root hash from node _N - 8_ and with the hashes
in the second piece of this shunt proof, to calculate the ART root hash for
block _N_.  The proof is valid if this calculated root hash matches the root
hash for which it requested the proof.

In order to fully verify the MARF Merkle proof, the client would verify that:

* The first segment proof's path's bytes are equal to the hash of the key for
  which the proof was requested.
* The first segment proof ends in a leaf node, and the leaf node contains the
  hash of the value for which the proof was requested.
* Each segment proof is valid -- the root hash could only be calculated from the
  deepest intermediate node in the segment,
* Each subsequent segment proof was generated from a prefix of the path
  represented by the current segment proof,
* Each back-pointer at the tail of each segment (except the one that terminates
  in the leaf -- i.e. the first one) was a number of blocks back that is equal
  to the number of blocks skipped over in the shunt proof linking it to the next
  segment.
* Each block header was included in the fork the client is querying,
* Each block header was generated from its associated ART root hash,
* (Optional, but encouraged): The burn chain block headers demonstrate that the
  correct difficulty rules were followed.  This step can be skipped if the
client somehow already knows that the hash of block _N_ is valid.

Note that to verify the proof, the client would need to substitute the
_block header hash_ for each intermediate node at the tail of each segment
proof.  The block header hash can either be obtained by fetching the block
headers for both the Stacks chain and burn chain _a priori_ and verifying that
they are valid, or by fetching them on-the-fly.  The second strategy should only
be used if the client's root hash it submits to the peer is known out-of-band to
be the correct hash.

The security of the proof is similar to SPV proofs in Bitcoin -- the proof is
valid assuming the client is able to either verify that the final header hash
represents the true state of the network, or the client is able to fetch the
true burn chain block header sequence.  The client has some assurance that a
_given_ header sequence is the _true_ header sequence, because the header
sequence encodes the proof-of-work that went into producing it.  A header
sequence with a large amount of proof-of-work is assumed to be infeasible for an
attacker to produce -- i.e. only the majority of the burn chain's network hash
power could have produced the header chain.  Regardless of which data the client
has, the usual security assumptions about confirmation depth apply -- a proof
that a key maps to a given value is valid only if the transaction that set
it is unlikely to be reversed by a chain reorg.

## Performance

The time and space complexity of a MARF is as follows:

* **Reads are _O(1)_** While reads may traverse multiple tries, they are always
  descending the radix trie, and resolving back pointers is constant time.
* **Inserts and updates are _O(1)._** Inserts have the same complexity
  as reads, though they require more work by constant factors (in
  particular, hash recalculations).
* **Creating a new block is _O(log B)_.** Inserting a block requires
  including the Merkle skip-list hash in the root node of the new
  ART. This is _log B_ work, where _B_ is chain length.
* **Creating a new fork is _O(log B)_.** Forks do not incur any overhead relative
  to appending a block to a prior chain-tip.
* **Generating a proof is _O(log B)_ for B blocks**.  This is the cost of
  reading a fixed number of nodes, combined with walking the Merkle skip-list.
* **Verifying a proof is _O(log B)_**.  This is the cost of verifying a fixed
  number of fixed-length segments, and verifying a fixed number of _O(log B)_
  shunt proof hashes.
* **Proof size is _O(log B)_**.  A proof has a fixed number of segment proofs,
  where each node has a constant size.  It has _O(log B)_ hashes across all of
  its shunt proofs.

## Consensus Details

The hash function used to generate a path from a key, as well as the hash
function used to generate a node hash, is SHA2-512/256.  This was chosen because
it is extremely fast on 64-bit architectures, and is immune to length extension
attacks.

The hash of an intermediate node is the hash over the following data:

* a 1-byte node ID,
* the sequence of child pointer data (dependent on the type of node),
* the 1-byte length of the path prefix this node contains,
* the 0-to-32-byte path prefix

A single child pointer contains:
* a 1-byte node ID,
* a 1-byte path character,
* the 32-byte block header hash of the pointed-to block

A `node4`, `node16`, `node48`, and `node256` each have an array of 4,
16, 48, and 256 child pointers each.

Children are listed in a `node4`, `node16`, and `node48`'s child pointer arrays in the
order in which they are inserted.  While searching for a child in a `node4` or
`node16` requires a linear scan of the child pointer array, searching a `node48` is done 
by looking up the child's index in its child pointer array using the
path character byte as an index into the `node48`'s 256-byte child pointer
index, and then using _that_ index to look up the child pointer.  Children are
inserted into the child pointer array of a `node256` by using the 1-byte
path character as the index.

The disk pointer stored in a child pointer, as well as the storage mechanism for
mapping hashes of values (leaves in the MARF) to the values themselves, are both
unspecified by the consensus rules.  Any mechanism or representation is
permitted.

# Related Work

This section will be expanded upon after this SIP is ratified.

[1] https://db.in.tum.de/~leis/papers/ART.pdf

# Backwards Compatibility

Not applicable

# Activation

At least 20 miners must register a name in the `.miner` namespace in Stacks 1.0.
Once the 20th miner has registered, the state of Stacks 1.0 will be snapshotted.
300 Bitcoin blocks later, the Stacks 2.0 blockchain will launch.  Stacks 2.0
implements the MARF internally.

# Reference Implementations

Implemented in Rust.  See https://github.com/blockstack/stacks-blockchain.




================================================
FILE: sips/sip-006/sip-006-runtime-cost-assessment.md
================================================
# Preamble

SIP Number: 006

Title: Clarity Execution Cost Assessment

Author: Aaron Blankstein <aaron@blockstack.com>, Reed Rosenbluth <reed@blockstack.com>

Consideration: Technical

Type: Consensus

Status: Ratified

Created: 19 October 2019

License: BSD 2-Clause

Sign-off: Jude Nelson <jude@stacks.org>, Technical Steering Committee Chair

Discussions-To: https://github.com/stacksgov/sips

# Abstract

This document describes the measured costs and asymptotic costs
assessed for the execution of Clarity code. This will not specify the
_constants_ associated with those asymptotic cost functions. Those
constants will necessarily be measured via benchmark harnesses and
regression analyses. Furthermore, the _analysis_ cost associated with
this code will not be covered by this proposal.

The asymptotic cost functions for Clarity functions are modifiable
via an on-chain voting mechanism. This enables new native functions to
be added to the language over time.

This document also describes the memory limit imposed during contract
execution, and the memory model for enforcing that limit.

# Introduction

Execution cost of a block of Clarity code is broken into 5 categories:

1. Runtime cost: captures the number of cycles that a single
   processor would require to process the Clarity block. This is a
   _unitless_ metric, so it will not correspond directly to cycles,
   but rather is meant to provide a basis for comparison between
   different Clarity code blocks.
2. Data write count: captures the number of independent writes
   performed on the underlying data store (see SIP-004).
3. Data read count: captures the number of independent reads
   performed on the underlying data store.
4. Data write length: the number of bytes written to the underlying
   data store.
5. Data read length: the number of bytes read from the underlying
   data store.

Importantly, these costs are used to set a _block limit_ for each
block.  When it comes to selecting transactions for inclusion in a
block, miners are free to make their own choices based on transaction
fees, however, blocks may not exceed the _block limit_. If they do so,
the block is considered invalid by the network --- none of the block's
transactions will be materialized and the leader forfeits all rewards
from the block.

## Static versus Dynamic Cost Assessment

Tracking the execution cost of a contract may be done either dynamically
or statically. Dynamic cost assessment involves tracking, at the VM level,
the various metrics as a contract is executed. Static cost assessment is
performed via analysis of the contract source code, and is inherently
a more pessimistic accounting of the execution cost: list operations
are charged according to the _maximum_ size of the list (per the type
annotations and inferences from the source code) and branching statements
are charged according to the _maximum_ branch cost (per metric tracked, i.e.,
if one branch performs 1 write and has a runtime cost of 1, and another
branch performs 0 writes and has a runtime cost of 2, the whole statement
will be assessed as having a maximum of 1 write and runtime cost of 2).

# Specification

## Costs of Common Operations

### Variable Lookup

Looking up variables in Clarity incurs a non-constant cost -- the stack
depth _and_ the length of the variable name affect this cost. However,
variable names in Clarity have bounded length -- 128 characters. Therefore,
the cost assessed for variable lookups may safely be constant with respect
to name length.

The stack depth affects the lookup cost because the variable must be
checked for in each context on the stack.

The cost model of Clarity depends on a copy-on-read semantic for
objects. This allows operations like appends, matches, wrapping/unwrapping,
to be constant cost, but it requires that variable lookups be charged for
copies.

Cost Function:

```
a*X+b*Y+c
```

a, b, and c are constants \
X := stack depth \
Y := variable size

### Function Lookup

Looking up a function in Clarity incurs a constant cost with respect
to name length (for the same reason as variable lookup). However,
because functions may only be defined in the top-level contract
context, stack depth does not affect function lookup.

Cost Function:

```
a
```

a is a constant.

### Name Binding

The cost of binding a name in Clarity -- in either a local or the contract
context is _constant_ with respect to the length of the name:

```
binding_cost = a
```

a is a constant

### Function Application

Function application in Clarity incurs a cost in addition to the
cost of executing the function's body. This cost is the cost of
binding the arguments to their passed values, and the cost of
ensuring that those arguments are of the correct type. Type checks
and argument binding are _linear_ in the size of the arguments.

The cost of applying a function is:


```
(a*X+b) + costEval(body)
```

a and b are constants \
X := the cumulative size of the argument types \
`costEval(body)` := the cost of executing the body of the function

### contract-call Transactions

User-signed transactions for contract-calls are charged for the
application of the function, as well as the loading of the contract
data. This charge is the same as a normal contract-call. _However_,
contract principals that are supplied as trait arguments must be
checked by the runtime system to ensure that they validly implement
the trait. The cost of this check is:

```
read_count = 2
read_length = trait_size + contract_size
runtime_cost = a*(contract_size) + b*(trait_size) + c
```

This check needs to read the trait, and then validate that the supplied
contract fulfills that trait by reading the contract in, and checking
the method signatures. This check must be performed for each such
trait parameter.

### Type Parsing

Parsing a type in Clarity incurs a linear cost in the size of the
AST describing the type:

```
type_parsing_cost(X) = (a*X+b)
```

a, b, are constants \
X := the number of elements in the type description AST

The type description AST is the tree of Clarity language elements used
for describing the type, e.g.:

* `(list 1 uint)` - this AST has four elements: `list`, `1`, `uint`
  and the parentheses containing them.
* `(response bool int)` - this AST has four elements: `response`, `bool`, `int`
  and the parentheses containing them.
* `int` - this AST is just one component.

### Function Definition

Defining a function in Clarity incurs an execution cost at the
time of contract publishing (unrelated to any analysis). This
is the cost of _parsing_ the function's signature, which is linear
in the length of the type signatures, and linear in the length of the
function name and argument names.

```
binding_cost + sum(a + type_parsing_cost(Y) for Y in ARG_TYPES)
```

`type_parsing_cost(Y)` := the cost of parsing argument Y \
ARG_TYPES := the function definition's argument type signatures \
a is a constant associated with the binding of argument types

### Contract Storage Cost

Storing a contract incurs both a runtime cost as well as storage costs. Both of
these are _linear_ the size of the contract AST.

```
WRITE_LENGTH = a*X+b
RUNTIME_COST = c*X+d
```

a, b, c, and d, are constants.

## Initial Native Function Costs

These are the initial set values for native function costs, however, these
can be changed as described below in the [Cost Upgrades](#cost-upgrades)
section of this document.

### Data, Token, Contract-Calls

#### Data Lookup Costs

Fetching data from the datastore requires hashing the key to be looked up.
That cost is linear in the key size:

```
data_hash_cost(X) = a*X+b
```

X := size of the key

#### Data Fetching Costs

Fetching data from the datastore incurs a runtime cost, in addition to
any costs associated with MARF accesses (which are simply counted as the
integer number of times the MARF is accessed). That runtime cost
is _linear_ in the size of the fetched value (due to parsing).

```
read_data_cost = a*X+b
```

X := size of the fetched value.

#### Data Writing Costs

Writing data to the datastore incurs a runtime cost, in addition to
any costs associated with MARF writes (which are simply counted as the
integer number of times the MARF is written). That runtime cost
is _linear_ in the size of the written value (due to data serialization).

```
write_data_cost = a*X+b
```

X := size of the stored value.

#### contract-call

Contract calls incur the cost of a normal function lookup and
application, plus the cost of loading that contract into memory from
the data store (which is linear in the size of the called contract).

```
RUNTIME_COST: (a*Y+b) + func_lookup_apply_eval(X)
READ_LENGTH: Y
```

a and b are constants \
Y := called contract size \
`func_lookup_apply_eval(X)` := the cost of looking up, applying, and
evaluating the body of the function


Note that contract-calls that use _trait_ definitions for dynamic dispatch
are _not_ charged at a different cost rate. Instead, there is a cost for
looking up the trait variable (assessed as a variable lookup), and the cost
of validating any supplied trait implementors is assessed during a transaction's
argument validation.

#### map-get

```
RUNTIME_COST: data_hash_cost(X+Y) + read_data_cost(Z)
READ_LENGTH:  Z
```

X := size of the map's _key_ tuple \
Y := the length of the map's name \
Z := the size of the map's _value_ tuple


#### contract-map-get

```
RUNTIME_COST: data_hash_cost(X) + read_data_cost(Z)
READ_LENGTH:  Z
```

X := size of the map's _key_ tuple \
Z := the size of the map's _value_ tuple

#### map-set

```
RUNTIME_COST: data_hash_cost(X+Y) + write_data_cost(Z)
WRITE_LENGTH:  Z
```

X := size of the map's _key_ tuple \
Y := the length of the map's name \
Z := the size of the map's _value_ tuple

#### map-insert

```
RUNTIME_COST: data_hash_cost(X+Y) + write_data_cost(Z)
WRITE_LENGTH:  Z
```

X := size of the map's _key_ tuple \
Y := the length of the map's name \
Z := the size of the map's _value_ tuple

#### map-delete

```
RUNTIME_COST: data_hash_cost(X+Y) + write_data_cost(1)
WRITE_LENGTH:  1
```

X := size of the map's _key_ tuple \
Y := the length of the map's name \
Y := the length of the map's name

#### var-get

```
RUNTIME_COST: data_hash_cost(1) + read_data_cost(Y)
READ_LENGTH: Y
```

Y := the size of the variable's _value_ type

#### var-set

```
RUNTIME_COST: data_hash_cost(1) + write_data_cost(Y)
WRITE_LENGTH: Y
```

Y := the size of the variable's _value_ type

#### nft-mint

```
RUNTIME_COST: data_hash_cost(Y) + write_data_cost(a) + b
WRITE_LENGTH: a
```

Y := size of the NFT type \
a is a constant: the size of a token owner \
b is a constant cost (for tracking the asset in the assetmap)

#### nft-get-owner

```
RUNTIME_COST: data_hash_cost(Y) + read_data_cost(a)
READ_LENGTH: a
```

Y := size of the NFT type \
a is a constant: the size of a token owner


#### nft-transfer

```
RUNTIME_COST: data_hash_cost(Y) + write_data_cost(a) + write_data_cost(a) + b
READ_LENGTH: a
WRITE_LENGTH: a
```

Y := size of the NFT type \
a is a constant: the size of a token owner \
b is a constant cost (for tracking the asset in the assetmap)

#### ft-mint
 
Minting a token is a constant-time operation that performs a constant
number of reads and writes (to check the total supply of tokens and
incremement).

```
RUNTIME: a
READ_LENGTH: b
WRITE_LENGTH: c
```
a, b, and c are all constants.

#### ft-transfer

Transfering a token is a constant-time operation that performs a constant
number of reads and writes (to check the token balances).

```
RUNTIME: a
READ_LENGTH: b
WRITE_LENGTH: c
```
a, b, and c are all constants.

#### ft-get-balance

Getting a token balance is a constant-time operation that performs a
constant number of reads.

```
RUNTIME: a
READ_LENGTH: b
```
a and b are constants.

#### get-block-info

```
RUNTIME: a
READ_LENGTH: b
```

a and b are constants.

## Control-Flow and Context Manipulation

### let

In addition to the cost of evaluating the body expressions of a `let`,
the cost of a `let` expression has a constant cost, plus
the cost of binding each variable in the new context (similar
to the cost of function evaluation, without the cost of type checks).


```
a + b * Y + costEval(body) + costEval(bindings)
```

a and b are constants \
Y := the number of let arguments \
`costEval(body)` := the cost of executing the body of the let \
`costEval(bindings)` := the cost of evaluating the value of each let binding

### if

```
a + costEval(condition) + costEval(chosenBranch)
```

a is a constant \
`costEval(condition)` := the cost of evaluating the if condition \
`costEval(chosenBranch)` := the cost of evaluating the chosen branch

if computed during _static analysis_, the chosen branch cost is the
`max` of the two possible branches.

### asserts!

```
a + costEval(condition) + costEval(throwBranch)
```

a is a constant \
`costEval(condition)` := the cost of evaluating the asserts condition \
`costEval(throwBranch)` := the cost of evaluating the throw branch in
the event that condition is false

if computed during _static analysis_, the thrown branch cost is always
included.

## List and Buffer iteration
### append

The cost of appending an item to a list is the cost of checking the
type of the added item, plus some fixed cost.

```
a + b * X
```

a and b is a constant \
X := the size of the list _entry_ type

### concat

The cost of concatting two lists or buffers is linear in
the size of the two sequences:

```
a + b * (X+Y)
```

a and b are constants \
X := the size of the right-hand iterable \
Y := the size of the left-hand iterable

### as-max-len?

The cost of evaluating an `as-max-len?` function is constant (the function
is performing a constant-time length check)

### map

The cost of mapping a list is the cost of the function lookup,
and the cost of each iterated function application

```
a + func_lookup_cost(F) + L * apply_eval_cost(F, i)
```

a is a constant \
`func_lookup_cost(F)` := the cost of looking up the function name F \
`apply_eval_cost(F, i)` := the cost of applying and evaluating the body of F on type i \
`i` := the list _item_ type \
`L` := the list length 

If computed during _static analysis_, L is the maximum length of the list
as specified by it's type.

### filter

The cost of filtering a list is the cost of the function lookup,
and the cost of each iterated filter application

```
a + func_lookup_cost(F) + L * apply_eval_cost(F, i)
```

a is a constant \
`func_lookup_cost(F)` := the cost of looking up the function name F \
`apply_eval_cost(F, i)` := the cost of applying and evaluating the body of F on type i \
`i` := the list _item_ type \
`L` := the list length

If computed during _static analysis_, L is the maximum length of the list
as specified by it's type.

### fold


The cost of folding a list is the cost of the function lookup,
and the cost of each iterated application

```
a + func_lookup_cost(F) + (L) * apply_eval_cost(F, i, j)
```

a is a constant \
`func_lookup_cost(F)` := the cost of looking up the function name F \
`apply_eval_cost(F, i, j)` := the cost of applying and evaluating the body of F on types i, j \
`j` := the accumulator type \
`i` := the list _item_ type \
`L` := the list length 

If computed during _static analysis_, L is the maximum length of the list
as specified by it's type.

### len

The cost of getting a list length is constant, because Clarity lists
store their lengths.

### list

The cost of constructing a new list is linear -- Clarity ensures that
each item in the list is of a matching type.

```
a*X+b
```

a and b are constants \
X := the total size of all arguments to the list constructor

### tuple

The cost of constructing a new tuple is `O(nlogn)` with respect to the number of
keys in the tuple (because tuples are represented as BTrees).

```
a*(X*log(X)) + b
```

a and b are constants \
X := the number of keys in the tuple

### get

Reading from a tuple is `O(nlogn)` with respect to the number of
keys in the tuple (because tuples are represented as BTrees).

```
a*(X*log(X)) + b
```

a and b are constants \
X := the number of keys in the tuple

## Option/Response Operations

### match

Match imposes a constant cost for evaluating the match, a cost for checking
that the match-bound name does not _shadow_ a previous variable. The
total cost of execution is:

```
a + evalCost(chosenBranch) + cost(lookupVariable)
```

where a is a constant, and `chosenBranch` is whichever branch
is chosen by the match. In static analysis, this will be:
`max(branch1, branch2)` 

### is-some, is-none, is-error, is-okay

These check functions all have constant cost.

### unwrap, unwrap-err, unwrap-panic, unwrap-err-panic, try!

These functions all have constant cost.

## Arithmetic and Logic Operations

### Variadic operators

The variadic operators (`+`,`-`,`/`,`*`, `and`, `or`) all have costs linear
in the _number_ of arguments supplied

```
(a*X+b)
```

X := the number of arguments

### Binary/Unary operators

The binary and unary operators:

```
>
>=
<
<=
mod
pow
xor
not
to-int
to-uint
```

all have constant cost, because their inputs are all of fixed sizes.

### Hashing functions

The hashing functions have linear runtime costs: the larger the value being
hashed, the longer the hashing function takes.

```
(a*X+b)
```

X := the size of the input.


## Memory Model and Limits

Clarity contract execution imposes a maximum memory usage limit for applications.
For any given Clarity value, the memory usage of that value is counted using
the _size_ of the Clarity value.

Memory is consumed by the following variable bindings:

* `let` - each value bound in the `let` consumes that amount of memory
    during the execution of the `let` block.
* `match` - the bound value in a `match` statement consumes memory during
    the execution of the `match` branch.
* function arguments - each bound value consumes memory during the execution
    of the function. this includes user-defined functions _as well as_ native
    functions.

Additionally, functions that perform _context changes_ also consume memory,
though they consume a constant amount:

* `as-contract`
* `at-block`

### Type signature size

Types in Clarity may be described using type signatures. For example,
`(tuple (a int) (b int))` describes a tuple with two keys `a` and `b`
of type `int`. These type descriptions are used by the Clarity analysis
passes to check the type correctness of Clarity code. Clarity type signatures
have varying size, e.g., the signature `int` is smaller than the signature for a
list of integers.

The size of a Clarity value is defined as follows:

```
type_size(x) :=
  if x = 
     int        => 16
    uint        => 16
    bool        => 1
    principal   => 148
    (buff y)    => 4 + y
    (some y)    => 1 + size(y)
    (ok y)      => 1 + size(y)
    (err y)     => 1 + size(y)
    (list ...)  => 4 + sum(size(z) for z in list)
    (tuple ...) => 1 + 2*(count(entries)) 
                     + sum(size(z) for each value z in tuple)
```

### Contract Memory Consumption

Contract execution requires loading the contract's program state in
memory. That program state counts towards the memory limit when
executed via a programmatic `contract-call!` or invoked by a
contract-call transaction.

The memory consumed by a contract is equal to:

```
a + b*contract_length + sum(size(x) for each constant x defined in the contract)
```

That is, a contract consumes memory which is linear in the contract's
length _plus_ the amount of memory consumed by any constants defined
using `define-constant`.

### Database Writes

While data stored in the database itself does _not_ count against the
memory limit, supporting public function abort/commit behavior requires
holding a write log in memory during the processing of a transaction.

Operations that write data to the data store therefore consume memory
_until the transaction completes_, and the write log is written to the
database. The amount of memory consumed by operations on persisted data
types is defined as:

* `data-var`: the size of the stored data var's value.
* `map`: the size of stored key + the size of the stored value.
* `nft`: the size of the NFT key
* `ft`: the size of a Clarity uint value.

## Cost Upgrades

In order to enable the addition of new native functions to the Clarity
language, there is a mechanism for voting on and changing a function's
_cost-assessment function_ (the asymptotic function that describes its
complexity and is used to calculate its cost). 

New functions can be introduced to Clarity by first being implemented
_in_ Clarity and published in a contract. This is necessary to avoid
a hard fork of the blockchain and ensure the availability of the function
across the network.

If it is decided that a published function should be a part of the Clarity
language, it can then be re-implemented as a native function in Rust and
included in a future release of Clarity. Nodes running this upgraded VM
would instead use this new native implementation of the function when they
encounter Clarity code that references it via `contract-call?`.

The new native function is likely faster and more efficient than the
prior Clarity implementation, so a new cost-assessment function may need
to be chosen for its evaluation. Until a new cost-assessment function is
agreed upon, the cost of the Clarity implementation will continue to be used.

### Voting on the Cost of Clarity Functions

New and more accurate cost-assessment functions can be agreed upon as
follows:

1. A user formulates a cost-assessment function and publishes it in a
Clarity contract as a `define-read-only` function.
2. The user proposes the cost-assessment function by calling the
`submit-proposal` function in the **Clarity Cost Voting Contract**.
3. Voting on the proposed function ensues via the voting functions in
the **Clarity Cost Voting Contract**, and the function is either
selected as a replacement for the existing cost-assessment function,
or ignored.

#### Publishing a Cost-Assessment Function

Cost-assessment functions to be included in proposals can be published
in Clarity contracts. They must be written precisely as follows:

1. The function must be `read-only`.
2. The function must return a tuple with the keys `runtime`, `write_length`,
`write_count`, `read_count`, and `read_length` (the execution cost measurement
[categories](#measurements-for-execution-cost)).
3. The values of the returned tuple must be Clarity expressions representing
the asymptotic cost functions. These expressions must be limited to **arithmetic operations**.
4. Variables used in these expressions must be listed as arguments to the Clarity
function.
5. Constant factors can be set directly in the code.

For example, suppose we have a function that implements a sorting algorithm:

```lisp
(define-public (quick-sort (input (list 1024 int))) ... )
```

The cost-assessment function should have _one_ argument, corresponding to the size
of the `input` field, e.g.

```lisp
(define-read-only (quick-sort-cost (n uint))
  {
    runtime: (* n (log n)),
    write_length: 0,
    write_count: 0,
    read_count: 0,
    read_length: 0,
  })
```

Here's another example where the cost function contains constant factors:

```lisp
(define-read-only (quick-sort-cost (n uint))
   {
     runtime: (+ 30 (* 2 n (log n))),
     write_length: 0,
     write_count: 0,
     read_count: 0,
     read_length: 0
   })
```

#### Making a Cost-Assessment Function Proposal

Stacks holders can propose cost-assessment functions by calling the
`submit-proposal` function in the **Clarity Cost Voting Contract**.

```Lisp
(define-public (submit-proposal
    (function-contract principal)
    (function-name (string-ascii 128))
    (cost-function-contract principal)
    (cost-function-name (string-ascii 128))
    ...
)
```

Description of `submit-proposal` arguments:
- `function-contract`: the principal of the contract that defines
the function for which a cost is being proposed
- `function-name`: the name of the function for which a cost is being proposed
- `cost-function-contract-principal`: the principal of the contract that defines
the cost function being proposed
- `cost-function-name`: the name of the cost-function being proposed

If submitting a proposal for a native function included in Clarity at boot,
provide the principal of the boot costs contract for the `function-contract`
argument, and the name of the corresponding cost function for the `function-name`
argument.

This function will return a response containing the proposal ID, if successful,
and an error otherwise.

Usage:
```Lisp
(contract-call?
    .cost-voting-contract
    "submit-proposal"
    .function-contract
    "function-name"
    .new-cost-function-contract
    "new-cost-function-name"
)
```

#### Viewing a Proposal

To view cost-assessment function proposals, you can use the 
`get-proposal` function in the **Clarity Cost Voting Contract**:

```Lisp
(define-read-only (get-proposal (proposal-id uint)) ... )
```

This function takes a `proposal-id` and returns a response containing the proposal
data tuple, if a proposal with the supplied ID exists, or an error code. Proposal
data tuples contain information about the state of the proposal, and take the
following form:

```Lisp
{
    cost-function-contract: principal,
    cost-function-name: (string-ascii 128),
    function-contract: principal,
    function-name: (string-ascii 128),
    expiration-block-height: uint
}
```

Usage:
```Lisp
(contract-call? .cost-voting-contract "get-proposal" 123)
```

### Voting

#### Stacks Holders

Stacks holders can vote for cost-assessment function proposals by calling the
**Clarity Cost Voting Contract's** `vote-proposal` function. The `vote-proposal`
function takes two arguments, `proposal-id` and `amount`. `proposal-id` is the ID
of the proposal being voted for. `amount` is the amount of STX the voter would like
to vote *with*. The amount of STX you include is the number of votes you are casting.

Calling the `vote` function authorizes the contract to transfer STX out
of the caller's address, and into the address of the contract. The equivalent
amount of `cost-vote-tokens` will be distributed to the voter, representing the
amount of STX they have staked in the voting contract.

STX staked for voting can be withdrawn from the voting contract by the voter with
the `withdraw-votes` function. If staked STX are withdrawn prior to confirmation,
they will not be counted as votes.

Upon withdrawal, the voter permits the contract to reclaim allocated `CFV` tokens,
and will receive the equivalent amount of their staked STX tokens.

**Voting example**
```Lisp
(contract-call? .cost-voting-contract "vote-proposal" 123 10000)
```

The `vote-proposal` function will return a successful response if the STX were staked
for voting, or an error if the staking failed.

**Withdrawal example**
```Lisp
(contract-call? .cost-voting-contract "withdraw-votes" 123 10000)
```

Like the `vote-proposal` function, the `withdraw-votes` function expects a `proposal-id` and
an `amount`, letting the voter withdraw some or all of their staked STX. This function
will return a successful response if the STX were withdrawn, and an error otherwise.

#### Miner Veto

Miners can vote *against* (veto) cost-function proposals by creating a transaction that
calls the **Clarity Cost Voting Contract's** `veto` function and mining
a block that includes this transaction. The `veto` function won't count
the veto if the block wasn't mined by the node that signed that transaction.
In other words, miners must **commit** their veto with their mining power.

Usage:
```Lisp
(contract-call? .cost-voting-contract "veto" 123)
```

This function will return a successful response if the veto was counted, or
an error if the veto failed.

### Confirming the Result of a Vote

In order for a cost-function proposal to get successfully voted in, it must be
**confirmed**. Confirmation is a two step process, involving calling the `confirm-votes`
function _before_ the proposal has expired to confirm the vote threshold was met,
and calling the `confirm-miners` function _after_ to confirm that the proposal wasn't vetoed
by miners.

#### Confirm Votes

Any stacks holder can call the `confirm-votes` function in the **Clarity
Cost Voting Contract** to attempt confirmation. `confirm-votes` will return a
success response and become **vote confirmed** if the following criteria are met.

1. The proposal must receive votes representing 20% of the liquid supply of STX.
This is calculated like such:
   
```lisp
(>= (/ (* votes u100) stx-liquid-supply) u20)
```

2. The proposal must not be expired, meaning its `expiration-height` must
not have been reached.
   
Usage:
```Lisp
(contract-call? .cost-voting-contract "confirm-votes" 123)
```

#### Confirm Miners

Like `confirm-votes`, any stacks holder can call the `confirm-miners` function.
`confirm-miners` will return a success response and the proposal will become
**miner confirmed** if the following criteria are met:

1. The number of vetos is less than 500.
2. There have been less than 10 proposals already confirmed in the current block.
3. The proposal has expired.

Usage:
```Lisp
(contract-call? .cost-voting-contract "confirm-miners" 123)
```

# Related Work

This section will be expanded upon after this SIP is ratified.

# Backwards Compatibility

All Stacks accounts from Stacks 1.0 will be imported into Stacks 2.0 when it
launches.  The state of the Stacks 1.0 chain will be snapshotted at Bitcoin
block 665750.

# Activation

At least 20 miners must register a name in the `.miner` namespace in Stacks 1.0.
Once the 20th miner has registered, the state of Stacks 1.0 will be snapshotted.
300 Bitcoin blocks later (Bitcoin block 666050), the Stacks 2.0 blockchain will launch.  Stacks 2.0
implements this SIP.

# Reference Implementations

Implemented in Rust.  See https://github.com/blockstack/stacks-blockchain.




================================================
FILE: sips/sip-007/sip-007-stacking-consensus.md
================================================
# Preamble

SIP Number: 007

Title: Stacking Consensus

Author:
    Muneeb Ali <muneeb@blockstack.com>,
    Aaron Blankstein <aaron@blockstack.com>,
    Michael J. Freedman <mfreed@cs.princeton.edu>,
    Diwaker Gupta <diwaker@blockstack.com>,
    Jude Nelson <jude@blockstack.com>, 
    Jesse Soslow <jesse@blockstack.com>, 
    Patrick Stanley <patrick@blockstack.com>

Consideration: Technical

Type: Consensus

Status: Ratified

Created: 14 January 2020

License: BSD 2-Clause

Sign-off: Jude Nelson <jude@stacks.org>, Technical Steering Committee Chair

Discussions-To: https://github.com/stacksgov/sips

# Abstract

This SIP proposes a new consensus algorithm, called Stacking, that
uses the proof-of-work cryptocurrency of an established blockchain to
secure a new blockchain. An economic benefit of the Stacking consensus
algorithm is that the holders of the new cryptocurrency can earn a
reward in a base cryptocurrency by actively participating in the
consensus algorithm.

This SIP proposes to change the mining mechanism of the Stacks
blockchain. [SIP-001](../sip-001/sip-001-burn-election.md) introduced
proof-of-burn (PoB) where a base cryptocurrency is destroyed to
participate in mining of a new cryptocurrency. This proposal argues
that a new mining mechanism called proof-of-transfer (PoX) will be an
improvement over proof-of-burn.

With proof-of-transfer, instead of destroying the base cryptocurrency,
miners are required to distribute the base cryptocurrency to existing
holders of the new cryptocurrency who participate in the consensus
algorithm. Therefore, existing holders of the new cryptocurrency have
an economic incentive to participate, do useful work for the network,
and receive rewards.

Proof-of-transfer avoids burning of the base cryptocurrency which
destroys some supply of the base cryptocurrency. Stacking in general
can be viewed as a more "efficient" algorithm where instead of
destroying a valuable resource (like electricity or base
cryptocurrency), the valuable resource is distributed to holders of
the new cryptocurrency.

The SIP describes one potential implementation of the Stacking
consensus algorithm for the Stacks blockchain using Bitcoin as the
base cryptocurrency.

# Introduction

Consensus algorithms for public blockchains require computational or
financial resources to secure the blockchain state. Mining mechanisms
used by these algorithms are broadly divided into proof-of-work (PoW),
in which nodes dedicate computational resources, and proof-of-stake
(PoS), in which nodes dedicate financial resources. The intention
behind both proof-of-work and proof-of-stake is to make it practically
infeasible for any single malicious actor to have enough computational
power or ownership stake to attack the network.

With proof-of-work, a miner does some "work" that consumes electricity
and is rewarded with digital currency. The miner is, theoretically,
converting electricity and computing power into the newly minted
digital currency. Bitcoin is an example of this and is by far the
largest and most secure PoW blockchain.

With proof-of-stake, miners stake their holdings of a new digital
currency to participate in the consensus algorithm and bad behavior
can be penalized by "slashing" the funds of the miner. PoS requires
less energy/electricity to be consumed and can give holders of the new
cryptocurrency who participate in staking a reward on their holdings
in the new cryptocurrency.

In this SIP we introduce a new consensus algorithm called
Stacking. The Stacking consensus algorithm uses a new type of mining
mechanism called *proof-of-transfer* (PoX). With PoX, miners are not
converting electricity and computing power to newly minted tokens, nor
are they staking their cryptocurrency. Rather they use an existing PoW
cryptocurrency to secure a new, separate blockchain.

This SIP proposes to change the mining
mechanism of the Stacks blockchain from proof-of-burn (SIP-001) to
proof-of-transfer.

The PoX mining mechanism is a modification of proof-of-burn (PoB)
mining (See
the [Blockstack Technical Whitepaper](https://blockstack.org/papers)
and [SIP-001](./sip-001-burn-election.md)). In
proof-of-burn mining, miners burn a base cryptocurrency to participate
in mining — effectively destroying the base cryptocurrency to mint
units of a new cryptocurrency. **In proof-of-transfer, rather than
destroying the base cryptocurrency, miners transfer the base
cryptocurrency as a reward to owners of the new cryptocurrency**. In
the case of the Stacks blockchain, miners would transfer Bitcoin to
owners of Stacks tokens in order for miners to receive newly-minted
Stacks tokens. The security properties of proof-of-transfer are
comparable to proof-of-burn.

# Specification

## Stacking with Bitcoin

In the Stacking consensus protocol, we require the base cryptocurrency
to be a proof-of-work blockchain. In this proposed implementation of
Stacking we assume that the PoW crypto-currency is Bitcoin, given it
is by far the most secure PoW blockchain. Theoretically, other PoW
blockchains can be used, but the security properties of Bitcoin are
currently superior to other PoW blockchains.

As with PoB, in PoX, the protocol selects the winning miner (*i.e.*,
the leader) of a round using a verifiable random function (VRF). The
leader writes the new block of the Stacks blockchain and mints the
rewards (newly minted Stacks). However, instead of bitcoins being sent
to burn addresses, the bitcoins are sent to a set of specific
addresses corresponding to Stacks (STX) tokens holders that are adding
value to the network. Thus, rather than being destroyed, the bitcoins
consumed in the mining process go to productive Stacks holders as a
reward based on their holdings of Stacks and participation in the
Stacking algorithm.

## Stacking Consensus Algorithm

In addition to the normal tasks of PoB mining
(see [SIP-001](./sip-001-burn-election.md)), the Stacking consensus
algorithm *must* determine the set of addresses that miners may
validly transfer funds to. PoB mining does not need to perform these
steps, because the address is always the same — the burn
address. However, with Stacking, network participants must be able to
validate the addresses that are sent to.

Progression in Stacking consensus happens over *reward cycles*. In
each reward cycle, a set of Bitcoin addresses are iterated over, such
that each Bitcoin address in the set of reward addresses has exactly
one Bitcoin block in which miners will transfer funds to the reward
address.

To qualify for a reward cycle, an STX holder must:


* Control a Stacks wallet with >= 0.02% of the total share of unlocked
  Stacks tokens (currently, there are ~470m unlocked Stacks tokens,
  meaning this would require ~94k Stacks). This threshold level
  adjusts based on the participation levels in the Stacking protocol.
* Broadcast a signed message before the reward cycle begins that:
    * Locks the associated Stacks tokens for a protocol-specified
      lockup period.
    * Specifies a Bitcoin address to receive the funds.
    * Votes on a Stacks chain tip.

Miners participating in the Stacks blockchain compete to lead blocks
by transferring Bitcoin. Leaders for particular Stacks blocks are
chosen by sortition, weighted by the amount of Bitcoin sent (see
SIP-001). Before a reward cycle begins, the Stacks network must reach
consensus on which addresses are valid recipients. Reaching consensus
on this is non-trivial: the Stacks blockchain itself has many
properties independent from the Bitcoin blockchain, and may experience
forks, missing block data, etc., all of which make reaching consensus
difficult. As an extreme example, consider a miner that forks the
Stacks chain with a block that claims to hold a large fraction (e.g.,
100%) of all Stacks holdings, and proceeds to issue block commitments
that pay all of the fees to themselves. How can other nodes on the
network detect that this miner’s commitment transfers are invalid?

The Stacking algorithm addresses this with a two-phase cycle. Before
each reward cycle, Stacks nodes engage in a *prepare* phase, in which
two items are decided:


1. An **anchor block** — the anchor block is a Stacks chain block. For
   the duration of the reward cycle, mining any descendant forks of
   the anchor block requires transferring mining funds to the
   appropriate reward addresses.
2. The **reward set** -- the reward set is the set of Bitcoin
   addresses which will receive funds in the reward cycle. This set is
   determined using Stacks chain state from the anchor block.

During the reward cycle, miners contend with one another to become the
leader of the next Stacks block by broadcasting *block commitments* on
the Bitcoin chain. These block commitments send Bitcoin funds to
either a burn address or a PoX reward address.

Address validity is determined according to two different rules:


1. If a miner is building off of any chain tip *which is not a
   descendant of the anchor block*, all of the miner's commitment
   funds must be burnt.
2. If a miner is building off a descendant of the anchor block, the
   miner must send commitment funds to 2 addresses from the reward
   set, chosen as follows:
    * Use the verifiable random function (also used by sortition) to
      choose 2 addresses from the reward set. These 2 addresses are
      the reward addresses for this block.
    * Once addresses have been chosen for a block, these addresses are
      removed from the reward set, so that future blocks in the reward
      cycle do not repeat the addresses.

Note that the verifiable random function (VRF) used for address
selection ensures that the same addresses are chosen by each miner
selecting reward addresses. If a miner submits a burn commitment which
*does not* send funds to a valid address, those commitments are
ignored by the rest of the network (because other network participants
can deduce that the transfer addresses are invalid).

To reduce the complexity of the consensus algorithm, Stacking reward
cycles are fixed length --- if fewer addresses participate in the
Stacking rewards than there are slots in the cycle, then the remaining
slots are filled with *burn* addresses. Burn addresses are included
in miner commitments at fixed intervals (e.g, if there are 1000 burn
addresses for a reward cycle, then each miner commitment would have
1 burn address as an output).

### Adjusting Reward Threshold Based on Participation

Each reward cycle may transfer miner funds to up to 4000 Bitcoin
addresses (2 addresses in a 2000 burn block cycle). To ensure that
this number of addresses is sufficient to cover the pool of
participants (given 100% participation of liquid STX), the threshold
for participation must be 0.025% (1/4000th) of the liquid supply of
STX. However, if participation is _lower_ than 100%, the reward pool
could admit lower STX holders. The Stacking protocol specifies **2
operating levels**:

* **25%** If fewer than `0.25 * STX_LIQUID_SUPPLY` STX participate in
  a reward cycle, participant wallets controlling `x` STX may include
  `floor(x / (0.0000625*STX_LIQUID_SUPPLY))` addresses in the reward set.
  That is, the minimum participation threshold is 1/16,000th of the liquid
  supply.
* **25%-100%** If between `0.25 * STX_LIQUID_SUPPLY` and `1.0 *
  STX_LIQUID_SUPPLY` STX participate in a reward cycle, the reward
  threshold is optimized in order to maximize the number of slots that
  are filled. That is, the minimum threshold `T` for participation will be
  roughly 1/4,000th of the participating STX (adjusted in increments
  of 10,000 STX). Participant wallets controlling `x` STX may
  include `floor(x / T)` addresses in the
  reward set.

In the event that a Stacker signals and locks up enough STX to submit
multiple reward addresses, but only submits one reward address, that
reward address will be included in the reward set multiple times.

### Submitting Reward Address and Chain Tip Signaling

Stacking participants must broadcast signed messages for three purposes:

1. Indicating to the network how many STX should be locked up, and for
   how many reward cycles.
2. Indicate support for a particular chain tip.
3. Specifying the Bitcoin address for receiving Stacking rewards.

These messages may be broadcast either on the Stacks chain or the
Bitcoin chain. If broadcast on the Stacks chain, these messages must
be confirmed on the Stacks chain _before_ the anchor block for the
reward period. If broadcast on the Bitcoin chain, they may be
broadcast during the prepare phase, but must be included before
the prepare phase finishes.

These signed messages are valid for at most 12 reward cycles (25200 Bitcoin
blocks or ~7 months). If the signed message specifies a lockup period `x` less
than 25200 blocks, then the signed message is only valid for Stacking
participation for `floor(x / 2100)` reward cycles (the minimum participation
length is one cycle: 2100 blocks).


## Anchor Blocks and Reward Consensus

In the **prepare** phase of the Stacking algorithm, miners and network
participants determine the anchor block and the reward set. The
prepare phase is a window `w` of Bitcoin blocks *before* the reward
cycle begins (e.g., the window may be 100 Bitcoin blocks).

At a high-level, nodes determine whether any block was confirmed by
`F*w` blocks during the phase, where `F` is a large fraction (e.g.,
`0.8`). Once the window `w` closes at time `cur`, Stacks nodes find
the potential anchor block as described in the following pseudocode:


```python
def find_anchor_block(cur):
  blocks_worked_on = get_all_stacks_blocks_between(cur - w, cur)

  # get the highest/latest ancestor before the PREPARE phase for each block worked
  # on during the PREPARE phase.

  candidate_anchors = {}
  for block in blocks_worked_on:
    pre_window_ancestor = last_ancestor_of_block_before(block, cur - w)
    if pre_window_ancestor is None:
      continue
    if pre_window_ancestor in candidate_anchors:
      candidate_anchors[pre_window_ancestor] += 1
    else:
      candidate_anchors[pre_window_ancestor] = 1

  # if any block is confirmed by at least F*w, then it is the anchor block.
  for candidate, confirmed_by_count in candidate_anchors.items():
    if confirmed_by_count >= F*w
      return candidate

  return None
```

Note that there can be at most one anchor block (so long as `F >
0.5`), because:

* Each of the `w` blocks in the prepare phase has at most one
  candidate ancestor.
* The total possible number of confirmations for anchor blocks is `w`.
* If any block is confirmed by `>= 0.5*w`, then any other block must
  have been confirmed by `< 0.5*w`.

The prepare phase, and the high threshold for `F`, are necessary to
protect the Stacking consensus protocol from damage due to natural
forks, missing block data, and potentially malicious participants. As
proposed, PoX and the Stacking protocol require that Stacks nodes are
able to use the anchor block to determine the *reward set*. If, by
accident or malice, the data associated with the anchor block is
unavailable to nodes, then the Stacking protocol cannot operate
normally — nodes cannot know whether or not a miner is submitting
valid block commitments. A high threshold for `F` ensures that a large
fraction of the Stacks mining power has confirmed the receipt of the
data associated with the anchor block.

### Recovery from Missing Data

In the extreme event that a malicious miner *is* able to get a hidden
or invalid block accepted as an anchor block, Stacks nodes must be
able to continue operation. To do so, Stacks nodes treat missing
anchor block data as if no anchor block was chosen for the reward
cycle — the only valid election commitments will therefore be *burns*
(this is essentially a fallback to PoB). If anchor block data which
was previously missing is revealed to the Stacks node, it must
reprocess all of the leader elections for that anchor block's
associated reward cycle, because there may now be many commitments
which were previously invalid that are now valid.

Reprocessing leader elections is computationally expensive, and
would likely result in a large reorganization of the Stacks
chain. However, such an election reprocessing may only occur once per
reward window (only one valid anchor block may exist for a reward
cycle, whether it was hidden or not). Crucially, intentionally
performing such an attack would require collusion amongst a large
fraction `F` of the Stacks mining power — because such a hidden block
must have been confirmed by `w*F` subsequent blocks. If collusion
amongst such a large fraction of the Stacks mining power is possible,
we contend that the security of the Stacks chain would be compromised
through other means beyond attacking anchor blocks.

### Anchoring with Stacker Support.

The security of anchor block selection is further increased through
Stacker support transactions. In this protocol, when Stacking
participants broadcast their signed participation messages, they
signal support of anchor blocks. This is specified by the chain tip's
hash, and the support signal is valid as long as the message itself is
valid.

This places an additional requirement on anchor block selection. In
addition to an anchor block needing to reach a certain number of miner
confirmations, it must also pass some threshold `t` of valid Stacker
support message signals. This places an additional burden on an anchor
block attack --- not only must the attacker collude amongst a large
fraction of mining power, but they must also collude amongst a
majority of the Stacking participants in their block.

## Stacker Delegation

The process of delegation allows a Stacks wallet address (the
represented address) to designate another address (the delegate
address) for participating in the Stacking protocol. This delegate
address, for as long as the delegation is valid, is able to sign and
broadcast Stacking messages (i.e., messages which lock up Stacks,
designate the Bitcoin reward address, and signal support for chain
tips) on behalf of the represented address. This allows the owner of
the represented address to contribute to the security of the network
by having the delegate address signal support for chain tips. This
combats potential attacks on the blockchain stability by miners that
may attempt to mine hidden forks, hide eventually invalid forks, and
other forms of miner misbehavior.

Supporting delegation adds two new transaction types to the Stacks
blockchain:

* **Delegate Funds.** This transaction initiates a
  represented-delegate relationship. It carries the following data:
    * Delegate address
    * End Block: the Bitcoin block height at which this relationship
      terminates, unless a subsequent delegate funds transaction updates
      the relationship.
    * Delegated Amount: the total amount of STX from this address
      that the delegate address will be able to issue Stacking messages
      on behalf of.
    * Reward Address (_optional_): a Bitcoin address that must be
      designated as the funds recipient in the delegate’s Stacking
      messages. If unspecified, the delegate can choose the address.
* **Terminate Delegation.** This transaction terminates a
  represented-delegate relationship. It carries the following data:
    * Delegate Address
    
_Note_: There is only ever one active represented-delegate
relationship between a given represented address and delegate address
(i.e., the pair _(represented-address, delegate-address)_ uniquely
identifies a relationship). If a represented-delegate relationship is
still active and the represented address signs and broadcasts a new
"delegate funds" transaction, the information from the new transaction
replaces the prior relationship.

Both types of delegation transactions must be signed by the
represented address. These are transactions on the Stacks blockchain,
and will be implemented via a native smart contract, loaded into the
blockchain during the Stacks 2.0 genesis block. These transactions,
therefore, are `contract-call` invocations. The invoked methods are
guarded by:

```
    (asserts! (is-eq contract-caller tx-sender) (err u0))
```

This insures that the methods can only be invoked by direct
transaction execution.

**Evaluating Stacking messages in the context of delegation.** In
order to determine which addresses’ STX should be locked by a given
Stacking message, the message must include the represented address in
the Stacking message. Therefore, if a single Stacks address is the
delegate for many represented Stacks addresses, the delegate address
must broadcast a Stacking message for each of the represented
addresses.

## Addressing Miner Consolidation in Stacking

PoX when used for Stacking rewards could lead to miner
consolidation. Because miners that _also_ participate as Stackers
could gain an advantage over miners who do not participate as
Stackers, miners would be strongly incentivized to buy Stacks and use
it to crowd out other miners. In the extreme case, this consolidation
could lead to centralization of mining, which would undermine the
decentralization goals of the Stacks blockchain. While we are actively
investigating additional mechanisms to address this potential
consolidation, we propose a time-bounded PoX mechanism and a Stacker-
driven mechanism here.

**Time-Bounded PoX.** Stacking rewards incentivize miner consolidation
if miners obtain _permanent_ advantages for obtaining the new
cryptocurrency. However, by limiting the time period of PoX, this
advantage declines over time. To do this, we define two time periods for Pox:

1. **Initial Phase.** In this phase, Stacking rewards proceed as
   described above -- commitment funds are sent to Stacking rewards
   addresses, except if a miner is not mining a descendant of the
   anchor block, or if the registered reward addresses for a given
   reward cycle have all been exhausted. This phase will last for
   approximately 2 years (100,000 Bitcoin blocks).

2. **Sunset Phase.** After the initial phase, a _sunset_ block is
   determined. This sunset block will be ~8 years (400,000 Bitcoin
   blocks) after the sunset phase begins. After the sunset block,
   _all_ miner commitments must be burned, rather than transfered to
   reward addresses. During the sunset phase, the reward / burn ratio
   linearly decreases by `0.25%` (1/400) on each reward cycle, such
   that in the 200th reward cycle, the ratio of funds that are
   transfered to reward addresses versus burnt must be equal to
   `0.5`. For example, if a miner commits 10 BTC, the miner must send
   5 BTC to reward addresses and 5 BTC to the burn address.

By time-bounding the PoX mechanism, we allow the Stacking protocol to
use PoX to help bootstrap support for the new blockchain, providing
miners and holders with incentives for participating in the network
early on. Then, as natural use cases for the blockchain develop and
gain steam, the PoX system could gradually scale down.

**Stacker-driven PoX.**  To further discourage miners from consolidating,
holders of liquid (i.e. non-Stacked) STX tokens may vote to disable PoX in the next upcoming
reward cycle.  This can be done with any amount of STX, and the act of voting
to disable PoX does not lock the tokens.

This allows a community of vigilent
users guard the chain from bad miner behavior arising from consolidation
on a case-by-case basis.  Specifically, if a fraction _R_ of liquid STX
tokens vote to disable PoX, it is disabled
only for the next reward cycle.  To continuously deactivate PoX, the STX
holders must continuously vote to disable it.

Due to the costs of remaining vigilent, this proposal recommends _R = 0.25_.
At the time of this writing, this is higher than any single STX allocation, but
not so high that large-scale cooperation is needed to stop a mining cartel.

## Bitcoin Wire Formats

Supporting PoX in the Stacks blockchain requires modifications to the
wire format for leader block commitments, and the introduction of new
wire formats for burnchain PoX participation (e.g., performing the STX
lockup on the burnchain).


### Leader Block Commits

For PoX, leader block commitments are similar to PoB block commits: the constraints on the
BTC transaction's inputs are the same, and the `OP_RETURN` output is identical. However,
the _burn output_ is no longer the same. For PoX, the following constraints are applied to
the second through nth outputs:

1. If the block commitment is in a reward cycle, with a chosen anchor block, and this block
   commitment builds off a descendant of the PoX anchor block (or the anchor block itself),
   then the commitment must use the chosen PoX recipients for the current block.
      * PoX recipients are chosen as described in "Stacking Consensus Algorithm": addresses
        are chosen without replacement, by using the previous burn block's sortition hash,
        mixed with the previous burn block's burn header hash as the seed for the ChaCha12
        pseudorandom function to select M addresses.
      * The leader block commit transaction must use the selected M addresses as outputs [1, M]
        That is, the second through (M+1)th output correspond to the select PoX addresses.
        The order of these addresses does not matter. Each of these outputs must receive the
        same amount of BTC.
      * If the number of remaining addresses in the reward set N is less than M, then the leader
        block commit transaction must burn BTC by including (M-N) burn outputs.
2. Otherwise, the second through (M+1)th output must be burn addresses, and the amount burned by
   these outputs will be counted as the amount committed to by the block commit.

In addition, during the sunset phase (i.e., between the 100,000th and 500,000th burn block in the chain),
the miner must include a _sunset burn_ output. This is an M+1 indexed output that includes the burn amount
required to fulfill the sunset burn ratio, and must be sent to the burn address:

```
sunset_burn_amount = (total_block_commit_amount) * (reward_cycle_start_height - 100,000) / (400,000)
```

Where `total_block_commit_amount` is equal to the sum of outputs [1, M+1].

After the sunset phase _ends_ (i.e., blocks >= 500,000th burn block), block commits are _only_ burns, with
a single burn output at index 1.

### STX Operations on Bitcoin

As described above, PoX allows stackers to submit `stack-stx`
operations on Bitcoin as well as on the Stacks blockchain. The Stacks
chain also allows addresses to submit STX transfers on the Bitcoin
chain. Such operations are only evaluated by the miner of an anchor block
elected in the burn block that immediately follows the burn block that included the
operations. For example, if a `TransferStxOp` occurs in burnchain block 100, then the
Stacks block elected by burnchain block 101 will process that transfer.

In order to submit on the Bitcoin chain, stackers must submit two Bitcoin transactions:

* `PreStxOp`: this operation prepares the Stacks blockchain node to validate the subsequent
  `StackStxOp` or `TransferStxOp`.
* `StackStxOp`: this operation executes the `stack-stx` operation.
* `TransferStxOp`: this operation transfers STX from a sender to a recipient

The wire formats for the above operations are as follows:

#### PreStxOp

This operation includes an `OP_RETURN` output for the first Bitcoin output that looks as follows:

```
            0      2  3
            |------|--|
             magic  op 
```

Where `op = p` (ascii encoded).

Then, the second Bitcoin output _must_ be Stacker address that will be used in a `StackStxOp`. This
address must be a standard address type parseable by the stacks-blockchain node.

#### StackStxOp

The first input to the Bitcoin operation _must_ consume a UTXO that is
the second output of a `PreStxOp`. This validates that the `StackStxOp` was signed
by the appropriate Stacker address.

This operation includes an `OP_RETURN` output for the first Bitcoin output:

```
            0      2  3                             19        20
            |------|--|-----------------------------|---------|
             magic  op         uSTX to lock (u128)     cycles (u8)
```

Where `op = x` (ascii encoded).

Where the unsigned integer is big-endian encoded.

The second Bitcoin output will be used as the reward address for any stacking rewards.

#### TransferStxOp

The first input to the Bitcoin operation _must_ consume a UTXO that is
the second output of a `PreStxOp`. This validates that the `TransferStxOp` was signed
by the appropriate STX address.

This operation includes an `OP_RETURN` output for the first Bitcoin output:

```
            0      2  3                             19        80
            |------|--|-----------------------------|---------|
             magic  op     uSTX to transfer (u128)     memo (up to 61 bytes)
```

Where `op = $` (ascii encoded).

Where the unsigned integer is big-endian encoded.

The second Bitcoin output is either a `p2pkh` or `p2sh` output such
that the recipient Stacks address can be derived from the
corresponding 20-byte hash (hash160).

# Related Work

This section will be expanded upon after this SIP is ratified.

# Backwards Compatibility

Not applicable.

# Activation

At least 20 miners must register a name in the `.miner` namespace in Stacks 1.0.
Once the 20th miner has registered, the state of Stacks 1.0 will be snapshotted.
300 Bitcoin blocks later (Bitcoin block 666050), the Stacks 2.0 blockchain will launch.  Stacks 2.0
implements this SIP.

# Reference Implementations

Implemented in Rust.  See https://github.com/blockstack/stacks-blockchain.




================================================
FILE: sips/sip-008/sip-008-analysis-cost-assessment.md
================================================
# Preamble

SIP Number: 008

Title: Clarity Parsing and Analysis Cost Assessment

Author: Aaron Blankstein <aaron@blockstack.com>

Consideration: Technical

Type: Consensus

Status: Ratified

Created: 5 March 2020

License: BSD 2-Clause

Sign-off: Jude Nelson <jude@stacks.org>, Technical Steering Committee Chair

Discussions-To: https://github.com/stacksgov/sips

# Abstract

This document describes the measured costs and asymptotic costs
assessed for parsing Clarity code into an abstract syntax tree (AST)
and the static analysis of that Clarity code (type-checking and
read-only enforcement). This will not specify the _constants_
associated with those asymptotic cost functions. Those constants will
necessarily be measured via benchmark harnesses and regression
analyses.

# Introduction

The cost of analyzing Clarity code is measured using the same 5 categories
described in SIP-006 for the measurement of execution costs:

1. Runtime cost: captures the number of cycles that a single
   processor would require to process the Clarity block. This is a
   _unitless_ metric, so it will not correspond directly to cycles,
   but rather is meant to provide a basis for comparison between
   different Clarity code blocks.
2. Data write count: captures the number of independent writes
   performed on the underlying data store (see SIP-004).
3. Data read count: captures the number of independent reads
   performed on the underlying data store.
4. Data write length: the number of bytes written to the underlying
   data store.
5. Data read length: the number of bytes read from the underlying
   data store.

Importantly, these costs are used to set a _block limit_ for each
block.  When it comes to selecting transactions for inclusion in a
block, miners are free to make their own choices based on transaction
fees, however, blocks may not exceed the _block limit_. If they do so,
the block is considered invalid by the network --- none of the block's
transactions will be materialized and the leader forfeits all rewards
from the block.

Costs for static analysis are assessed during the _type check_ pass.
The read-only and trait-checking passes perform work which is strictly
less than the work performed during type checking, and therefore, the
cost assessment can safely fold any costs that would be incurred during
those passes into the type checking pass.

# Specification

## Common Analysis Metrics and Costs

### AST Parsing

The Clarity parser has a runtime that is linear with respect to the Clarity
program length.

```
a*X+b
```

where a and b are constants, and

X := the program length in bytes

### Dependency cycle detection

Clarity performs cycle detection for intra-contract dependencies (e.g.,
functions that depend on one another). This detection is linear in the
number of dependency edges in the smart contract:

```
a*X+b
```

where a and b are constants, and
X := the total number of dependency edges in the smart contract

Dependency edges are created anytime a top-level definition refers 
to another top-level definition.

### Type signature size

Types in Clarity may be described using type signatures. For example,
`(tuple (a int) (b int))` describes a tuple with two keys `a` and `b`
of type `int`. These type descriptions are used by the Clarity analysis
passes to check the type correctness of Clarity code. Clarity type signatures
have varying size, e.g., the signature `int` is smaller than the signature for a
list of integers.

The signature size of a Clarity type is defined as follows:

```
type_signature_size(x) :=
  if x = 
     int      => 1
    uint      => 1
    bool      => 1
    principal => 1
    buffer    => 2
    optional  => 1 + type_signature_size(entry_type)
    response  => 1 + type_signature_size(ok_type) + type_signature_size(err_type)
    list      => 2 + type_signature_size(entry_type)
    tuple     => 1 + 2*(count(entries)) 
                   + sum(type_signature_size for each entry)
                   + sum(len(key_name) for each entry)
```

### Type annotation

Each node in a Clarity contract's AST is annotated with the type value
for that node during the type checking analysis pass.

The runtime cost of type annotation is:

```
a + b*X
```

where a and b are constants, and X is the type signature size of the
type being annotated.

### Variable lookup

Looking up variables during static analysis incurs a non-constant cost -- the stack
depth _and_ the length of the variable name affect this cost. However,
variable names in Clarity have bounded length -- 128 characters. Therefore,
the cost assessed for variable lookups may safely be constant with respect
to name length.

The stack depth affects the lookup cost because the variable must be
checked for in each context on the stack.

Cost Function:

```
a*X+b*Y+c
```

where a, b, and c are constants,
X := stack depth
Y := the type size of the looked up variable

### Function Lookup

Looking up a function incurs a constant cost with respect
to name length (for the same reason as variable lookup). However,
because functions may only be defined in the top-level contract
context, stack depth does not affect function lookup.

Cost Function:

```
a*X + b
```

where a and b are constants,
X := the sum of the type sizes for the function signature (each argument's type size, as well
    as the function's return type)

### Name Binding

The cost of binding a name in Clarity -- in either a local or the contract
context is _constant_ with respect to the length of the name, but linear in
the size of the type signature.

```
binding_cost = a + b*X
```

where a and b are constants, and
X := the size of the bound type signature

### Type check cost

The cost of a static type check is _linear_ in the size of the type signature:

```
type_check_cost(expected, actual) :=
  a + b*X
```

where a and b are constants, and

X := `max(type_signature_size(expected), type_signature_size(actual))`

### Function Application

Static analysis of a function application in Clarity requires
type checking the function's expected arguments against the
supplied types.

The cost of applying a function is:


```
a + sum(type_check_cost(expected, actual) for each argument)
```

where a is a constant.

This is also the _entire_ cost of type analysis for most function calls
(e.g., intra-contract function calls, most simple native functions). 

### Iterating the AST

Static analysis iterates over the entire program's AST in the type checker,
the trait checker, and in the read-only checker. This cost is assessed
as a constant cost for each node visited in the AST during the type
checking pass.

## Special Function Costs

Some functions require additional work from the static analysis system.

### Functions on sequences (e.g., map, filter, fold)

Functions on sequences need to perform an additional check that the
supplied type is a list or buffer before performing the normal
argument type checking. This cost is assessed as:

```
a
```

where a is a constant.

### Functions on options/responses

Similarly to the functions on sequences, option/response functions
must perform a simple check to see if the supplied input is an option or
response before performing additional argument type checking. This cost is
assessed as:

```
a
```

### Data functions (ft balance checks, nft lookups, map-get?, ...)

Static checks on intra-contract data functions do not require database lookups
(unlike the runtime costs of these functions). Rather, these functions
incur normal type lookup (i.e., fetching the type of an NFT, data map, or data var)
and type checking costs.

### get

Checking a tuple _get_ requires accessing the tuple's signature
for the specific field. This has runtime cost:

```
a*log(N) + b
```
where a and b are constants, and

N := the number of fields in the tuple type

### tuple

Constructing a tuple requires building the tuple's BTree for
accessing fields. This has runtime cost:


```
a*N*log(N) + b
```
where a and b are constants, and

N := the number of fields in the tuple type

### use-trait

Importing a trait imposes two kinds of costs on the analysis.
First, the import requires a database read. Second, the imported
trait is included in the static analysis output -- this increases
the total storage usage and write length of the static analysis.

The costs are defined as:

```
read_count = 1
write_count = 0
runtime = a*X+b
write_length = c*X+d
read_length = c*X+d
```

where a, b, c, and d are constants, and

X := the total type size of the trait (i.e., the sum of the
    type sizes of each function signature).

### contract-call?

Checking a contract call requires a database lookup to inspect
the function signature of a prior smart contract.

The costs are defined as:

```
read_count = 1
read_length = a*X+b
runtime = c*X+d
```

where a, b, c, and d are constants, and

X := the total type size of the function signature

### let

Let bindings require the static analysis system to iterate over
each let binding and ensure that they are syntactically correct.

This imposes a runtime cost:

```
a*X + b
```
where a and b are constants, and

X := the number of entries in the let binding.

# Related Work

This section will be expanded upon after this SIP is ratified.

# Backwards Compatibility

Not applicable.

# Activation

At least 20 miners must register a name in the `.miner` namespace in Stacks 1.0.
Once the 20th miner has registered, the state of Stacks 1.0 will be snapshotted.
300 Bitcoin blocks later (Bitcoin block 666050), the Stacks 2.0 blockchain will launch.  Stacks 2.0
implements this SIP.

# Reference Implementations

Implemented in Rust.  See https://github.com/blockstack/stacks-blockchain.




================================================
FILE: sips/sip-009/sip-009-nft-standard.md
================================================
# Preamble

SIP Number: 009

Title: Standard Trait Definition for Non-Fungible Tokens

Author: Friedger Müffke (mail@friedger.de), Muneeb Majeed

Consideration: Technical

Type: Standard

Status: Ratified

Created: 10 December 2020

License: CC0-1.0

Sign-off: Jude Nelson <jude@stacks.org>, Technical Steering Committee Chair

# Abstract

Non-fungible tokens or NFTs are digital assets registered on blockchain with unique identifiers and properties that distinguish them from each other.
It should be possible to uniquely identify, own and transfer a non-fungible token. This SIP aims to provide a flexible and easy-to-implement standard that can be used by developers on the Stacks blockchain when creating their own NFTs. This standard only specifies a basic set of requirements, non-fungible tokens can have more features than what's specified in this standard.

# License and Copyright

This SIP is made available under the terms of the Creative Commons CC0 1.0 Universal license, available at https://creativecommons.org/publicdomain/zero/1.0/
This SIP’s copyright is held by the Stacks Open Internet Foundation.

# Introduction

Tokens are digital assets registered on blockchain through a smart contract. A non-fungible token (NFT) is a token that is globally unique and can be identified through its unique identifier.

In blockchains with smart contracts, including the Stacks blockchain, developers and users can use smart contracts to register and interact with non-fungible tokens.

The Stacks blockchain's programming language for developing smart contracts, Clarity, has built-in language primitives to define and use non-fungible tokens. Although those primitives exists, there is value in defining a common interface (known in Clarity as a "trait") that allows different smart contracts to interoperate with non-fungible token contracts in a reusable way. This SIP defines that trait.

Each NFT always belong to one smart contract. NFTs of a smart contract are enumerated starting at 1. The current last ID is provided by a smart contract function. The asset ID together with the contract ID defines a globally unique NFT.

# Specification

Every SIP-009 compliant smart contract in Stacks blockchain must implement the trait, `nft-trait`, defined in the [Trait](#trait) section and must meet the requirements for the following functions:

### Last token ID

`(get-last-token-id () (response uint uint))`

Takes no arguments and returns the identifier for the last NFT registered using the contract. The returned ID can be used as the upper limit when iterating through all NFTs.

This function must never return an error response. It can be defined as read-only, i.e. `define-read-only`.

### Token URI

`(get-token-uri (uint) (response (optional (string-ascii 256)) uint))`

Takes an NFT identifier and returns a response containing a valid URI which resolves to the NFT's metadata. The URI string must be wrapped in an `optional`. If the corresponding NFT doesn't exist or the contract doesn't maintain metadata, the response must be `(ok none)`. If a valid URI exists for the NFT, the response must be `(ok (some "<URI>"))`. The length of the returned URI is limited to 256 characters. The specification of the metadata should be covered in a separate SIP.

This function must never return an error response. It can be defined as read-only, i.e. `define-read-only`.

### Owner

`(get-owner (uint) (response (optional principal) uint))`

Takes an NFT identifier and returns a response containing the principal owning the NFT with the given identifier. The principal must be wrapped in an optional. If the corresponding NFT doesn't exist, the response must be `(ok none)`. The owner can be a contract principal.

If a call to function `get-owner` returns some principal `A`, then it must return the same value until the `transfer` function is called with principal `A` as the sender.

For any call to `get-owner` with an ID greater than the last token ID returned by the `get-last-token-id` function, the call must return a response `(ok none)`.

This function must never return an error response. It can be defined as read-only, i.e. `define-read-only`.

### Transfer

`(transfer (uint principal principal) (response bool uint))`

The function changes the ownership of the NFT for the given identifier from the sender principal to the recipient principal.

This function must be defined with define-public, as it alters state, and must be externally callable.

After a successful call to `transfer`, the function `get-owner` must return the recipient of the `transfer` call as the new owner.

For any call to `transfer` with an ID greater than the last token ID returned by the `get-last-token-id` function, the call must return an error response.

It is recommended to use error codes from standardized list of codes and implement the function for converting the error codes to messages function that are defined in a separate SIP.

## Trait

```
(define-trait nft-trait
  (
    ;; Last token ID, limited to uint range
    (get-last-token-id () (response uint uint))

    ;; URI for metadata associated with the token
    (get-token-uri (uint) (response (optional (string-ascii 256)) uint))

     ;; Owner of a given token identifier
    (get-owner (uint) (response (optional principal) uint))

    ;; Transfer from the sender to a new principal
    (transfer (uint principal principal) (response bool uint))
  )
)
```

## Use of native asset functions

Although it is not possible to mandate in a Clarity trait, contract implementers must define at least one built-in native non-fungible [asset class](https://app.sigle.io/friedger.id/FDwT_3yuMrHDQm-Ai1OVS) that are provided as Clarity primitives. This allows clients to use Post Conditions (explained below), and takes advantages of other benefits, like native support for these asset balances and transfers through `stacks-blockchain-api`. The reference implementations included in this SIP use the native asset primitives, and provide a good boilerplate for their usage.

The native asset functions include:

- `define-non-fungible-token`
- `nft-burn?`
- `nft-get-owner?`
- `nft-mint?`
- `nft-transfer?`

The following requirements for using native asset functions are defined:

### Transfer

If the `transfer` function is called from a client without a [post-condition](https://docs.blockstack.org/understand-stacks/transactions#post-conditions) in deny mode or without any NFT condition about a changed owner, then the function call must fail with `abort_by_post_condition`.

# Using NFTs in applications

Developers who wish to use a non-fungible token contract in an application should first be provided, or keep track of, various different non-fungible token implementations. When validating a non-fungible token contract, they should fetch the interface and/or source code for that contract. If the contract implements the trait, then the application can use this standard's contract interface for making transfers and getting other details defined in this standard.

All of the functions in this trait return the `response` type, which is a requirement of trait definitions in Clarity. However, some of these functions should be "fail-proof", in the sense that they should never return an error. These "fail-proof" functions are those that have been recommended as read-only. If a contract that implements this trait returns an error for these functions, it may be an indication of a non-compliant contract, and consumers of those contracts should proceed with caution.

## Use of Post-Conditions

The Stacks blockchain includes a feature known as "Post-Conditions" or "Constraints". By defining post-conditions, users can create transactions that include pre-defined guarantees about what might happen in that contract.

For example, when applications call the `transfer` function, they should _always_ use post conditions to specify that the new owner of the NFT is the recipient principal in the `transfer` function call.

# Related Work

NFTs are an established asset class on blockchains. Read for example [here](https://www.ledger.com/academy/what-are-nft).

## EIP 721

Ethereum has [EIP 721](https://eips.ethereum.org/EIPS/eip-721) that defined non-fungible tokens on the Ethereum blockchain. Notable differences are that the transfer function in EIP 721 uses a different ordering of the arguments ending with the token id. The transfer function in this SIP uses the token ID as the first argument which is in line with the other native functions in Clarity. Furthermore, this SIP only defines a function for getting the URI pointing to the metadata of an NFT. The specifications for schema and other properties of the token metadata should be defined in a separate SIP.

# Backwards Compatibility

Not applicable

# Activation

This SIP is activated if 5 contracts are deployed that use the same trait that follows this specification. This must happen before Bitcoin tip #700,000.

A trait that follows this specification is available on mainnet as [`SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait`](https://explorer.stacks.co/txid/0x80eb693e5e2a9928094792080b7f6d69d66ea9cc881bc465e8d9c5c621bd4d07?chain=mainnet).

# Reference Implementations

## Source code

### Friedger's clarity-smart-contracts

https://github.com/friedger/clarity-smart-contracts/blob/master/contracts/sips/nft-trait.clar

## Deployed Contracts

- mainnet: [SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait](https://explorer.stacks.co/txid/SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait?chain=mainnet)
- testnet: [ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT.nft-trait.nft-trait](https://explorer.stacks.co/txid/ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT.nft-trait?chain=testnet)



================================================
FILE: sips/sip-010/sip-010-fungible-token-standard.md
================================================
# Preamble

SIP Number: 010

Title: Standard Trait Definition for Fungible Tokens

Author: Hank Stoever <hstove@gmail.com>, Pascal Belloncle <psq@nanorails.com>

Consideration: Technical

Type: Standard

Status: Ratified

Created: 25 January 2021

License: CC0-1.0

Sign-off: Jude Nelson <jude@stacks.org>, Technical Steering Committee Chair

Layer: Traits

Discussions-To: https://github.com/stacksgov/sips

# Abstract

Fungible tokens are digital assets that can be sent, received, combined, and divided. Most forms of cryptocurrencies are fungible tokens. They have become a building block of almost all blockchains. This SIP aims to provide a flexible and easy-to-implement standard that can be used by developers on the Stacks blockchain when creating their own tokens.

# License and Copyright

This SIP is made available under the terms of the Creative Commons CC0 1.0 Universal license, available at https://creativecommons.org/publicdomain/zero/1.0/
This SIP’s copyright is held by the Stacks Open Internet Foundation.

# Introduction

Digital assets can have the property to be fungible. A _fungible_ token can be broken down into small units and added together. An owner of a fungible asset only needs to care about their balance, that is, the total amount of a particular fungible asset that they own. Most well-known currencies are fungible. For fungible tokens, there is no difference between any two different amounts of the fungible token.

For example, if a user owns 10 units of a fungible asset, they may send 2 units to a different user. At this point, their balance is 8 units. If they later receive more units, their total balance will be updated.

On blockchains, fungible tokens are a core component. Blockchains with smart contracts, including the Stacks blockchain, allow developers and users to create and interact with smart contracts that use fungible tokens.

The Stacks blockchain has a native fungible token: the Stacks token (STX). In addition to the native STX token, the Stacks blockchain's programming language for developing smart contracts, Clarity, has built-in language primitives to define and use fungible tokens. Although those primitives exists, there is value in defining a common interface (known in Clarity as a "trait") that allows different smart contracts to interoperate with fungible token contracts in a reusable way. This SIP defines that trait.

# Specification

The fungible token trait, `sip-010-trait`, has 7 functions:

## Trait functions

### Transfer

`(transfer ((amount uint) (sender principal) (recipient principal) (memo (optional (buff 34)))) (response bool uint))`

Transfer the fungible token from the sender of this transaction to the recipient. The `amount` is an unsigned integer. It is recommended that implementing contracts use the built-in `ft-transfer?` Clarity method. If the sender does not have enough tokens to complete the transaction, the transaction should abort and return an `(err uint)`.

This method must be defined with `define-public`, as it alters state, and should be externally callable.

Contract implementers should take note to perform authorization of the `transfer` method. For example, a fungible token contract that wants to make sure that only the transaction's sender is able to move the requested tokens might first check that the sender argument is equal to tx-sender.

When returning an error in this function, the error codes should follow the same patterns as the built-in `ft-transfer?` and `stx-transfer?` functions.

| error code | reason                                          |
| ---------- | ----------------------------------------------- |
| u1         | `sender` does not have enough balance           |
| u2         | `sender` and `recipient` are the same principal |
| u3         | `amount` is non-positive                        |
| u4         | `sender` is not the same as `tx-sender`         |

Contract implementers should take note that in Stacks 2.0, the memo field won't be included in the event emitted by successful `ft-transfer?` operations. As a consequence, the implementer has to make sure that the memo is emitted by adding a `print` statement if the `ft-transfer?` is successful and the memo is not `none`. The memo should be upwrapped and emitted after the `ft-transfer?` operation.

Example:

```
  ...
  (try! (ft-transfer? token amount sender recipient))
  (match memo to-print (print to-print) 0x)
  ...
```

### Name

`(get-name () (response (string-ascii 32) uint))`

Return a human-readable name for the contract, such as "CoolPoints", etc.

This method should be defined as read-only, i.e. `define-read-only`.

### Symbol

`(get-symbol () (response (string-ascii 32) uint))`

Return a symbol that allows for a shorter representation of a token. This is sometimes referred to as a "ticker". Examples: "STX", "COOL", etc. Typically, a token could be referred to as $SYMBOL when referencing it in writing.

This method should be defined as read-only, i.e. `define-read-only`.

### Decimals

`(get-decimals () (response uint uint))`

The number of decimal places in a token. All fungible token balances must be represented as integers, but providing the number of decimals provides for an abstraction of a token that humans are more familiar dealing with. For example, the US Dollar has 2 decimals, if the base unit is "cents", as is typically done in accounting. Stacks has 6 decimals, Bitcoin has 8 decimals, and so on.

As another example, if a token has 4 decimals, and the `get-balance` method a particular user returns `100345000`, wallets and exchanges would likely represent that value as `10034.5`.

This method should be defined as read-only, i.e. `define-read-only`.

### Balance of

`(get-balance (principal) (response uint uint))`

Return the balance of a particular principal (also known as "address" or "account"). Implementations should typically use the built-in Clarity method `ft-get-balance`.

This method should be defined as read-only, i.e. `define-read-only`.

### Total supply

`(get-total-supply () (response uint uint))`

Return the total supply of this token. Implementations should typically use the built-in Clarity method `ft-get-supply`.

This method should be defined as read-only, i.e. `define-read-only`.

### Token URI

`(get-token-uri () (response (optional (string-utf8 256)) uint))`

Returns an optional string that is a valid URI which resolves to this token's metadata. This allows your token to provide off-chain metadata about the contract, such as a description and an image icon.

The JSON schema for this metadata is as follows:

```json
{
  "title": "Asset Metadata",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Identifies the asset to which this token represents"
    },
    "description": {
      "type": "string",
      "description": "Describes the asset to which this token represents"
    },
    "image": {
      "type": "string",
      "description": "A URI pointing to a resource with mime type image/* representing the asset to which this token represents. Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive."
    }
  }
}
```

Clients that fetch this data should prefer any on-chain data, such as the name of the token, over metadata provided in `get-token-uri`.

## Trait implementation

An implementation of the proposed trait is provided below.

```clarity
(define-trait sip-010-trait
  (
    ;; Transfer from the caller to a new principal
    (transfer (uint principal principal (optional (buff 34))) (response bool uint))

    ;; the human readable name of the token
    (get-name () (response (string-ascii 32) uint))

    ;; the ticker symbol, or empty if none
    (get-symbol () (response (string-ascii 32) uint))

    ;; the number of decimals used, e.g. 6 would mean 1_000_000 represents 1 token
    (get-decimals () (response uint uint))

    ;; the balance of the passed principal
    (get-balance (principal) (response uint uint))

    ;; the current total supply (which does not need to be a constant)
    (get-total-supply () (response uint uint))

    ;; an optional URI that represents metadata of this token
    (get-token-uri () (response (optional (string-utf8 256)) uint))
  )
)
```

## Implementing in wallets and other applications

Developers who wish to interact with a fungible token contract should first be provided, or keep track of, various different fungible token implementations. When validating a fungible token contract, they should fetch the interface and/or source code for that contract. If the contract implements the trait, then the wallet can use this standard's contract interface for making transfers and getting balances.

Downstream consumers of contracts that implement this trait should be aware that the `get-name` and `get-symbol` function are not guaranteed to be globally unique. Because of this, consumers should be advised that `get-name` and `get-token` are only hints to provide a more human-readable experience. Care should always be taken to verify that a contract's identifier matches that of the token a client is intending to interact with.

All of the functions in this trait return the `response` type, which is a requirement of trait definitions in Clarity. However, some of these functions should be "fail-proof", in the sense that they should never return an error. These "fail-proof" functions are those that have been recommended as read-only. If a contract that implements this trait returns an error for these functions, it may be an indication of a faulty contract, and consumers of those contracts should proceed with caution.

## Use of native asset functions

Although it is not possible to mandate in a Clarity trait, contract implementers should always use the built-in native assets that are provided as Clarity primitives. This allows clients to use Post Conditions (explained below), and takes advantages of other benefits, like native support for these asset balances and transfers through `stacks-blockchain-api`. The reference implementations included in this SIP use the native asset primitives, and provide a good boilerplate for their usage.

The native asset primitives include:

- `define-fungible-token`
- `ft-burn?`
- `ft-get-balance`
- `ft-get-supply`
- `ft-mint?`
- `ft-transfer?`

## Use of post conditions

In addition to built-in methods for fungible token contracts, the Stacks blockchain includes a feature known as Post Conditions. By defining post conditions, users can create transactions that include pre-defined guarantees about what might happen in that contract.

One such post condition could be "I will transfer exactly 100 of X token", where "X token" is referenced as a specific contract's fungible token. When wallets and applications implement the `transfer` method, they should _always_ use post conditions to specify that the user will transfer exactly the amount of tokens that they specify in the `amount` argument of the `transfer` function. Only in very specific circumstances should such a post condition not be included.

# Related work

## Ethereum ERC20

[Ethereum ERC20 standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)

Perhaps the oldest, and most well known, standard for fungible tokens is Ethereum's [ERC20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) standard. It has become one of the strongest building blocks for the Ethereum ecosystem. When all fungible tokens follow the same standard, any wallet or application developer can interact with it without having to create custom logic for handling each individual token.

Fungible tokens have become so popular that the Clarity smart contracting language has support for basic fungible token operations built-in. In fact, as can be seen in this proposal's reference implementation, very little code is required to implement a fungible token. The important part of this standard is defining a Clarity trait that all fungible tokens can implement. Even though Clarity has fungible token operations built-in, it is important for each contract to define the same methods so that their contracts are easy to integrate.

# Backwards Compatibility

Not applicable

# Activation

This trait has been deployed to mainnet: [SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard](https://explorer.stacks.co/txid/0x99e01721e57adc2c24f7d371b9d302d581dba1d27250c7e25ea5f241af14c387?chain=mainnet)

This trait will be considered activated when this trait is deployed to mainnet, and 3 different implementations of the trait have been deployed to mainnet, no later than Bitcoin block 700000.

# Reference Implementations

An example implementation has been submitted with this proposal, along with a Javascript client and tests. https://github.com/hstove/stacks-fungible-token

Other examples of Clarity contracts that implement fungible tokens, although not exactly according to this specification:

- [@psq's trait and implementation](https://github.com/psq/flexr/blob/master/contracts/src20-trait.clar)
- [@friedger's fungible token implementation](https://github.com/friedger/clarity-smart-contracts/blob/master/contracts/tokens/fungible-token.clar)

## Deployed Contracts

- mainnet: [SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait](https://explorer.stacks.co/txid/SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard?chain=mainnet)
- testnet: [ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT.sip-010-trait-ft-standard.sip-010-trait](https://explorer.stacks.co/txid/ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT.sip-010-trait-ft-standard?chain=testnet)



================================================
FILE: sips/sip-012/sip-012-cost-limits-network-upgrade.md
================================================
# Preamble

SIP Number: 012

Title: Burn Height Selection for a Network Upgrade to Introduce New Cost-Limits

Authors:
* Asteria <asteria@syvita.org>
* Aaron Blankstein <aaron@hiro.so>
* Diwaker Gupta <diwaker@hiro.so>
* Hank Stoever <hank@stackerlabs.co>
* Jason Lau <jason@okcoin.com>
* Jude Nelson <jude@stacks.org>
* Ludovic Galabru <ludo@hiro.so>
* Trevor Owens <trevor@stacks.ac>
* Xan Ditkoff <xan@daemontechnologies.co>
* Pavitthra Pandurangan <pavitthra@hiro.so>
* Reed Rosenbluth <reed@hiro.so>

Consideration: Governance, Technical

Type: Consensus

Status: Ratified

Created: 2021-10-08

License: BSD 2-Clause

Sign-off: Harold Davis (governance) <recursive3@gmail.com>, Juliet Oberding
(governance) <juliet.oberding@gmail.com>, Jason Schrader (governance) <jason@joinfreehold.com>,
Jude Nelson (technical) <jude@stacks.org>

Discussions-To: https://github.com/stacksgov/sips

# Abstract

The Stacks 2.0 blockchain artificially constrains block goodput in two
consensus-critical ways: it assesses storage costs for lists based on their
maximum length instead of actual length, and it constrains the number of indexed
I/O operations well below what the reference implementation is capable of
handling.  Changing either of these is breaking change, which requires a
network-wide upgrade.

This SIP proposes executing a breaking change to not only
address these two constraints, but also to update all Clarity cost functions to
more accurately reflect their true performance.  The breaking change is carried
out via a network-wide vote by Stackers on the Bitcoin blockchain, which will
both serve to activate this SIP and to effectively bypass the cost voting procedure
in SIP-006.

The upgraded blockchain will be called Stacks 2.05.

# License and Copyright

This SIP is made available under the terms of the Creative Commons CC0 1.0
Universal license, available at
https://creativecommons.org/publicdomain/zero/1.0/ This SIP's copyright is held
by the Stacks Open Internet Foundation.

# Introduction

The current block limits were set very conservatively in Stacks 2.0, but
since the mainnet launch on 2021-01-14, traffic on the network has grown
steadily.  In recent months, we have seen network congestion adversely
impacting the user experience: valid transactions are not
getting mined in a timely manner because there is far more demand for block compute
capacity than supply.  For example, in Stacks blocks from height 27,672 through 28,573, 675
blocks' highest-filled compute dimension was their `runtime` dimension, but 319
blocks' highest-filled compute dimension was their `read_count` dimension ([full
report](./SIP-012-001.ods)).  In another study of 455 Stacks blocks between height
30,904 and 33,002, just over 14% of them exceeded the `read_count` dimension
and just over 85% exceeded the `runtime` dimension ([full report](https://github.com/blockstack/stacks-blockchain/discussions/2883)).

While there will likely always be more demand than supply for block compute
capacity, the current supply is artifically limited in three principal ways:

* At the time of the launch, the MARF index (see SIP-004) was implemented in
  such a way that a block could only execute 7,500 MARF index reads and writes
while being processed by a non-mining node on consumer hardware in a reasonable
amount of time.  This number was arrived at by measuring how many MARF reads and writes
could be completed on a consumer laptop in 10 seconds in 2019.  But because the block limit is a
consensus-critical constant that all Stacks nodes must agree on, increasing the
number of MARF reads and writes per block can only be done via a breaking
change.  This means that any improvements to the MARF's performance that could
permit significant increase in the number of operations per block can only
be capitalized upon via a breaking change.

* An emerging Clarity contract design pattern is to store data maps and data
  variables comprised of lists with a large maximum length.  The reason
for this, we suspect, is because it permits storing a lot of MARF-indexed data with
few MARF reads and writes.  However, the Clarity VM assesses list storage based
on its _maximum_ length, not the length of the data stored.  Assessing storage
based on the length of the data would allow contracts to make better use of the
`read_length` and `write_length` compute resources (which have been hit in
practice), but this would require a breaking change.

* Most of the cost functions in SIP-006 have constants that are far too
  conservative in practice.  The numbers used when mainnet launched were chosen
to minimize the risk of a network-wide denial-of-service arising from producing
blocks that would take an inordinate amount of time to validate; they were not
chosen through a rigorous benchmarking process.  In the months since then,
we have developed a more rigorous 
[benchmark suite](https://github.com/blockstack/clarity-benchmarking)
for the Clarity VM implementation, and have arrived at more accurate runtime
constants for the cost functions that permit suitable block validation times on contemporary
hardware.  The new limits, listed in [Appendix A](#appendix-a), 
would vastly increase the number of Clarity functions that can be
executed per block.  But in order to capitalize on this new data, STX token holders would
need to execute the SIP-006 cost voting protocol to activate new cost functions.

This SIP proposes a **breaking change** that would address these first two
limitations.  It would increase the block runtime `read_count` and `write_count`
limits by a factor of 2, in order to allow the network to capitalize on a [recent MARF performance
improvement](https://github.com/blockstack/stacks-blockchain/issues/2869).  It
would also change storage cost assessment for list data to consider the length
of the value being stored, instead of its maximum length.  In addition, this 
would bypass the voting protocol in SIP-006 to set 
[new proposed runtime cost functions parameters](https://forum.stacks.org/t/more-accurate-cost-functions-for-clarity-native-functions/12386)
via a voting protocol described in this SIP.

## A Note on Bypassing SIP-006

This SIP explicitly bypasses the voting procedure in SIP-006 by means of a separate
voting procedure described below.  However, this SIP does not supersede SIP-006,
nor does it set a precedent for this particular voting procedure's general
applicability to making collective decisions in the SIP process.  The voting
procedure in this SIP is specific to this SIP, and is only meant to activate the
changes described in this SIP.

The reason for this accommodation is that the SIP-006 voting procedure may be
too costly to use in practice, since STX holders must forego Stacking to use it.
A future SIP may study this problem further, and propose a new voting procedure 
for runtime costs in recognition of this.  However, that is not the subject of
this SIP.

# Specification

## Activation Protocol

In the text below, "Stacks 2.05" refers to the proposed network-upgrade for
cost-limits.

Due to the far-reaching effects a breaking change will have on the Stacks
ecosystem, this SIP can only be activated through a collective decision-making
process.  There are three major steps to this activation procedure:

   1.  The SIP authors will propose a Bitcoin block number at which the new cost-limits
   take effect. The block number should be at least two calendar weeks from when
   this SIP transitions into _Recommended_ status, so as to provide sufficient time for
   node operators to upgrade. Tentatively this block number would be chosen to fall
   on November 29th or November 30th, 2021.  In this document, this is the
**activation block**.

   On November 15, 2021, the SIP authors finalized the choice of Bitcoin block
713,000 to be the activation block.  This block is expected to be mined at or
around December 6, 2021.  The reason for this extra week delay over the
tentative block number is to ensure that the network upgrade happens in the
_middle_ of a reward cycle.  November 29th/30th is expected to be the start of
reward cycle 21. Executing a network upgrade at the start of a reward cycle is
needlessly risky, because if the upgrade fails for some reason during the
prepare phase, it could cause PoX rewards to be disabled for cycle 21.

   2.  In the two whole reward cycles prior to the activation block, users who
       have Stacked STX will have the opportunity to cast a vote to activate
this SIP.  The cut-off for voting will be a _separate_ Bitcoin block whose
expected arrival time is one calendar week prior to the activation block.  This
document refers to this block as the **vote deadline block.**

   On November 15, 2021, the SIP authors finalized the decision to select the
first Bitcoin block height mined after November 23, 2021 at 12:00 EST to be the
vote deadline block.  This was Bitcoin block 710,001.

   3.  If the activation voting threshold is met as of the vote deadline block,
then the Stacks Foundation will make a release of the Stacks blockchain
reference implementation with this
SIP's changes applied and set to take effect once the activation block passes.
If on the other hand there is insufficient support for this SIP by the vote
deadline block, then no action will be taken and this SIP will not activate.
   
   On November 23, 2021, the SIP authors inspected the Bitcoin and Stacks chainstate
using [vote-tallying scripts](./scripts) and determined that the the voting threshold has been met.
At least 129,615,879 stacked STX had voted in favor of this SIP, and 0 against.

To activate this SIP, users who have Stacked STX in either of the last two whole
reward cycles prior to the vote deadline block height will have the opportunity to
vote with their STX by sending a minimial amount of BTC to one of two addresses.
There will be two Bitcoin addresses whose UTXOs will be used to tally the
vote: a "yes" address, and a "no" address.

* The "yes" address will be a p2pkh Bitcoin address whose inner Hash160 is
  `00000000000000000000000000000000000000ee`.  On mainnet, this is address
`111111111111111111112czxoHN`.

* The "no" address will be a separate p2pkh Bitcoin address whose inner Hash160
  is `00000000000000000000000000000000000000ff`.  On mainnet, this is address
`111111111111111111112kmzDG2`.

Note that these are similar addresses to the PoX burn address, but they all
differ from one another in their checksums.

Vote tallying is performed by examining how many STX the Bitcoin transaction
sender has most-recently Stacked.  By examining the UTXOs for these two Bitcoin
addresses, anyone with a full copy of the Stacks chain state as of the voting
deadline will be able to calculate how many recently-Stacked STX have signaled
"yes" or "no" support for this SIP.

To match the Bitcoin transaction to the Stacker's state in the `.pox` contract,
the `scriptSig` of the first transaction input must be signed by either the user's PoX reward
address's public key(s), or the public key(s) of the standard principal Stacks address that Stacked
the tokens (the option is provided here because not all Stackers have access to their PoX
addresses).  In either case, the vote commits the Stacker's
most-recently-locked STX to "yes" or "no" if the Stacker had some STX locked
in the past two reward cycles as of the vote deadline block.

For Stackers that vote with their Stacks address key(s), the STX that the
associated standard principal had locked up will be committed to the vote.

For Stackers that vote with their PoX address key(s), the STX for _all_
associated Stacks principals that use this PoX address will be committed to the
vote (note that multiple Stacks principals may use the same PoX address).

For Stackers that have delegated STX to a Stacking pool, the pool operator must
perform the vote on their behalf.  As with a normal Stacker, the pool operator may 
sign the Bitcoin transaction with either the PoX reward address key(s) or the
standard Stacks principal address key(s).

For Stackers that have Stacked via a smart contract, only the PoX reward
address key(s) may be used to vote.

Stackers can send as many Bitcoin transactions as they like, but their STX will
only be counted once.  Only the *first* such voting transaction will be
considered to determine how the STX voted.

If a Stacker votes using both their STX address and PoX address, then the PoX
address will be used to count their STX.  A subsequent vote with the STX address
will be ignored as a duplicate vote.  In particular, the PoX address will
count *all* STX it represents.  For example, if Alice Stacks 100,000 STX with two STX
addresses that share the same PoX address, and she votes with her PoX address,
then the vote will count for 200,000 STX, and she will be unable to vote
separately with her STX addresses.  If instead she votes with only one
of her STX addresses, then that vote counts for 100,000 STX.

If a Stacker votes for both "yes" and "no," their vote will not be counted at
all.  This provides a way for a Stacker to cancel their vote, but they will be
unable to change it.

### Activation Criteria 

The SIP will be considered _Ratified_ if the vote to activate Stacks 2.05
passes. This requires:

* 2/3 of all votes passed are "yes", weighted by the STX they represent, at a
  Bitcoin block height at or before the vote deadline block.

* At least 60 million STX are represented by the "yes" votes. This is 2x the
  largest Stacker at the time of this writing.

### Rationale 

The rationale for this voting procedure is that it simultaneously gives the
community a way to veto the SIP while also accommodating low turnout. The
problem with blockchain-based voting systems in the past is that unless
there is a financial incentive to vote (e.g. mining, staking), turnout is low.
For example, the Ethereum carbon vote [1] to disable the DAO smart contract had only
5.5% turnout [2].  As another example, BitShares' [3] highest-voted delegate in its
delegated proof-of-stake consensus algorithm only received 18% of the vote [4].

This SIP's activation procedure takes the position that non-voters are passive
system participants and do not care about the outcome of this SIP -- they will
be happy either way.  But, this SIP also acknowledges that of the voters that
_do_ care about the vote outcome, those who vote "no" are financially
disincentivized to do so, because it would render the Stacks blockchain in a
worse-off state.  Therefore, this SIP requires a supermajority of "yes" votes to
activate, since a strong minority of "no" votes would be a strong signal that
something is seriously wrong with this SIP (despite its apparent benefits).

## Changes to Mining

Nodes that run Stacks 2.05 must put `0x05` in the memo field. Block-commit
transactions that do not have a value that is _at least_ `0x05` will be considered invalid.

The purpose of this change is to ensure that in the unlikely event some miners didn't know
about this SIP, they will quickly find out because their blocks will never be
confirmed or recognized by other users and exchanges that have upgraded.
Moreover, the "at least" condition is meant for future compatibility: if there
is ever another SIP that requires miners to signal support for the SIP's
activation via the memo field, then they can do so by putting in a _higher_
value while still remaining able to mine under the current rules.

## Changes to Runtime Costs

This SIP proposes two breaking changes to runtime costs, as well as a new set of
default cost functions (bypassing SIP-006's voting procedure).

### Block Limit

This SIP proposes increasing the block limits
for MARF reads and writes.  This is a breaking change.

Based on the expected performance improvements in the
implementation of the MARF (see [issue #2869](https://github.com/blockstack/stacks-blockchain/issues/2869)) 
this SIP proposes doubling the current limits on blocks:

```rust
pub const BLOCK_LIMIT_MAINNET: ExecutionCost = ExecutionCost {
    write_length: 15_000_000, // roughly 15 mb
    write_count: 15_000,
    read_length: 100_000_000,
    read_count: 15_000,
    runtime: 5_000_000_000,
};
```

### Changes to Static vs. Dynamic Tabulation of Costs

The cost assessment in Clarity for most data-handling functions (e.g.,
`map-get?`) use the static cost of the fetch rather than the dynamic cost. 
This is a breaking change.  For more information, see [issue #2864](https://github.com/blockstack/stacks-blockchain/issues/2864) in the
`stacks-blockchain` repository.

There are two motivating reasons for doing this:

* It makes static analysis of costs easier, because the cost assessed at runtime
  would always use the declared size of the map entry.
* It allows the cost to be assessed before running the operation.

However, these reasons have not been shown to be practical in production.
For (1), static analysis is always going to overestimate anyways, so system
throughput would improve by using the actual runtime overhead instead of the
maximum runtime overhead when assessing storage costs.  For (2),
allowing a single "speculative" evaluation before aborting a block due to cost
overflow is not particularly burdensome to the network: the maximum size of an
overread is a single Clarity value, which takes only 2MB.

The benefit of using dynamic costs, however, could be significant. Many contracts use
patterns where potentially long lists are stored in data maps, but in practice
the stored lists are relatively short.

Because of this, this SIP proposes using a dynamic cost for these assessments.
Specifically, it proposes changes to the inputs of the following
functions' cost functions:

* `var-get`
* `var-set`
* `map-get?`
* `map-set`
* `map-insert`
* `map-delete`
* `concat`
* `nft-mint?`
* `nft-burn?`
* `nft-transfer?`
* `nft-get-owner?`

#### `(var-get var-name) -> value`

The `x` input to the `var-get` cost function should be the length in
bytes of the consensus serialization (see [SIP-005](https://github.com/stacksgov/sips/blob/main/sips/sip-005/sip-005-blocks-and-transactions.md#clarity-value-representation)
for details on this format) of the returned `value`.

#### `(var-set var-name value)`

The `x` input to the `var-get` cost function should be the length in
bytes of the consensus serialization (see [SIP-005](https://github.com/stacksgov/sips/blob/main/sips/sip-005/sip-005-blocks-and-transactions.md#clarity-value-representation)
for details on this format) of the newly stored `value`.

The memory usage of this function should be this same value. The
memory usage of `var-set` remains in effect until the end of the
transaction (data operations remain in memory during the whole
transaction to enable rollbacks and post-conditions).

#### `(map-get? map-name key) -> value`

The `x` input to the `map-get` cost function should be the sum of the
length in bytes of the consensus serialization of the supplied `key`
and the returned `value`.

#### `(map-set map-name key value)`

The `x` input to the `map-set` cost function should be the sum of the
length in bytes of the consensus serialization of the supplied `key` and
`value` arguments.

The memory usage of this function should be this same value. The
memory usage of `map-set` remains in effect until the end of the
transaction (data operations remain in memory during the whole
transaction to enable rollbacks and post-conditions).

#### `(map-insert map-name key value)`

If the insert is successful, the `x` input to the `map-insert` cost
function should be the sum of the length in bytes of the consensus
serialization of the supplied `key` and `value` arguments.

If the insert is unsuccessful, the `x` input to the `map-insert` cost
function should be the length in bytes of the consensus serialization
of just the supplied `key` argument.

The memory usage of this function should be this same `x` value. The
memory usage of `map-insert` remains in effect until the end of the
transaction (data operations remain in memory during the whole
transaction to enable rollbacks and post-conditions).

#### `(map-delete map-name key)`

The `x` input to the `map-delete` cost function should be the length
in bytes of the consensus serialization of the supplied `key`
argument plus the length in bytes of the consensus serialization of
a `none` Clarity value.

The memory usage of this function should be this same `x` value. The
memory usage of `map-delete` remains in effect until the end of the
transaction (data operations remain in memory during the whole
transaction to enable rollbacks and post-conditions).

#### `(concat list-a list-b)`

The `x` input to the `concat` cost function should be the length of
`list-a` plus the length of `list-b`.

#### `(nft-mint? asset-class asset-identifier recipient)`

The `x` input to the `nft-mint?` cost function should be the length in bytes of
the consensus serialization of the supplied `asset-identifier`.

The memory usage of this function should be this new `x` value, plus the size of
a `principal` type.  The memory
usage of `nft-mint?` remains in effect until the end of the transaction (asset
operations remain in memory during the whole transaction to enable rollbacks and
post-conditions).

#### `(nft-burn? asset-class asset-identifier owner)`

The `x` input to the `nft-burn?` cost function should be the length in bytes of
the consensus serialization of the specified `asset-identifier`.

The memory usage of this function should be this new `x` value, plus the size of
a `principal` type.  The memory
usage of `nft-burn?` remains in effect until the end of the transaction (asset
operations remain in memory during the whole transaction to enable rollbacks and
post-conditions).

#### `(nft-transfer? asset-class asset-identifier sender recipient)`

The `x` input to the `nft-transfer?` cost function should be the length in bytes
of the consensus serialization of the specified `asset-identifier`.

The memory usage of this function should be this new `x` value, plus the size of
a `principal` type.  The memory
usage of `nft-transfer?` remains in effect until the end of the transaction (asset
operations remain in memory during the whole transaction to enable rollbacks and
post-conditions).

#### `(nft-get-owner? asset-class asset-identifier)`

The `x` input to the `nft-get-owner?` cost function should be the length in
bytes of the consensus serialization of the specified `asset-identifier`.

### New Default Cost Functions

Based on results from the
[clarity-benchmarking](https://github.com/blockstack/clarity-benchmarking)
project, this SIP proposes new default cost functions. The new costs are supplied in
the form of a new Clarity smart contract in [Appendix A](#appendix-a).

This could have been carried out through a SIP-006 cost voting procedure, but
due to the opportunity costs incurred by STX holders foregoing PoX rewards to
carry this vote out, this SIP instead proposes bypassing the SIP-006 voting
procedure in this one instance and instead using this SIP's activation procedure
to install these new functions.

# Related Work 

On-chain voting for upgrades is not a new concept.  Bitcoin has famously
executed many soft-forks using time-based activation [5], miner voting
thresholds [6], and a combination of both [7].  The voting approach in this SIP
uses both a timeout and a voting threshold to activate, but differs from
Bitcoin's approach in that it empowers Stackers as the instigators of the
upgrade.

We are aware of one other proposal
(distinct from the procedure described in SIP-006) suggested
using a voting contract to determine the block height at which a
network-upgrade, described in detail in [this Github
discussion](https://github.com/blockstack/stacks-blockchain/discussions/2845).
This SIP differs from this proposal in that the burnchain is used to identify
Stackers.

# Backwards Compatibility

This SIP proposes a breaking change.  If this SIP activates, then old miners'
block-commits will no longer be considered valid.  In addition, old nodes will
not accept new blocks as valid if they exceed the Stacks 2.0 block cost limits.
Therefore, all node operators are encouraged to upgrade immediately once SIP 012
transitions to _Activation-in-Progress_ status.

# Activation

The SIP will be considered _Ratified_ once all of the following are true:

* The cost functions in Appendix A are finalized.  This is a precondition for
  advancing the SIP to _Activation-in-Progress_ status.

* A vote deadline block height and activation block height are chosen and added
  to this SIP's text.  This is a pre-condition for advancing this SIP to
_Activation-in-Progress_ status.

* This SIP is advanced to _Activation-in-Progress_ by the respective consideration
  advisory boards.

* The SIP has garnered sufficient support by the vote deadline block height. Voting by
  sending Bitcoin transactions can begin once the SIP text is updated with the
  "yes" / "no" addresses. Voting concludes at least one week prior to the Stacks 2.05
  activation block.

* A new release of Stacks blockchain (available at
  https://github.com/blockstack/stacks-blockchain/releases) contains the updated
  cost-limits and a mechanism to use the new cost-limits beyond the activation
block height listed in this SIP.  This release is announced by the Stacks
Foundation.

* The activation block height passes on the Bitcoin chain.

## Activation Status

* On November 15, 2021, the authors finalized the choice of the activation
  block to be Bitcoin block 713,000.  This block is expected to be mined at or
around December 6, 2021 at 23:00 UTC.

* The vote deadline block will be backdated to the first Bitcoin block mined
  after November 23, 2021 at 12:00 EST.  The exact block number will be added to
this SIP's text once it is known.

# Reference Implementation

The reference implementation of this SIP is developed in the `next-costs` branch
of the reference implementation of the Stacks blockchain, available at
https://github.com/blockstack/stacks-blockchain.

# References

[1] http://v1.carbonvote.com/

[2] https://en.wikipedia.org/wiki/Ethereum_Classic#Carbon_vote

[3] https://en.bitcoinwiki.org/wiki/BitShares

[4] https://bitcointalk.org/index.php?topic=916696.330;imode

[5] https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki

[6] https://github.com/bitcoin/bips/blob/master/bip-0034.mediawiki

[7] https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki

# Appendices

## Appendix A

The new proposed cost functions, which will be instantiated at
`SP000000000000000000002Q6VF78.costs-2.05.clar`:

```lisp
;; the .costs-2 contract

;; Helper Functions

;; Return a Cost Specification with just a runtime cost
(define-private (runtime (r uint))
    {
        runtime: r,
        write_length: u0,
        write_count: u0,
        read_count: u0,
        read_length: u0,
    })

;; Linear cost-assessment function
(define-private (linear (n uint) (a uint) (b uint))
    (+ (* a n) b))

;; LogN cost-assessment function
(define-private (logn (n uint) (a uint) (b uint))
    (+ (* a (log2 n)) b))

;; NLogN cost-assessment function
(define-private (nlogn (n uint) (a uint) (b uint))
    (+ (* a (* n (log2 n))) b))


;; Cost Functions
(define-read-only (cost_analysis_type_annotate (n uint))
    (runtime (linear n u1 u9)))

(define-read-only (cost_analysis_type_check (n uint))
    (runtime (linear n u113 u1)))

(define-read-only (cost_analysis_type_lookup (n uint))
    (runtime (linear n u1 u6)))

(define-read-only (cost_analysis_visit (n uint))
    (runtime u1))

(define-read-only (cost_analysis_iterable_func (n uint))
    (runtime (linear n u2 u14)))

(define-read-only (cost_analysis_option_cons (n uint))
    (runtime u6))

(define-read-only (cost_analysis_option_check (n uint))
    (runtime u3))

(define-read-only (cost_analysis_bind_name (n uint))
    (runtime (linear n u2 u176)))

(define-read-only (cost_analysis_list_items_check (n uint))
    (runtime (linear n u2 u4)))

(define-read-only (cost_analysis_check_tuple_get (n uint))
    (runtime (logn n u1 u2)))

(define-read-only (cost_analysis_check_tuple_merge (n uint))
    (runtime (linear n u1000 u1000)))

(define-read-only (cost_analysis_check_tuple_cons (n uint))
    (runtime (nlogn n u3 u5)))

(define-read-only (cost_analysis_tuple_items_check (n uint))
    (runtime (linear n u1 u59)))

(define-read-only (cost_analysis_check_let (n uint))
    (runtime (linear n u1 u12)))

(define-read-only (cost_analysis_lookup_function (n uint))
    (runtime u20))

(define-read-only (cost_analysis_lookup_function_types (n uint))
    (runtime (linear n u1 u28)))

(define-read-only (cost_analysis_lookup_variable_const (n uint))
    (runtime u15))

(define-read-only (cost_analysis_lookup_variable_depth (n uint))
    (runtime (nlogn n u1 u34)))

(define-read-only (cost_ast_parse (n uint))
    (runtime (linear n u172 u287441)))

(define-read-only (cost_ast_cycle_detection (n uint))
    (runtime (linear n u141 u72)))

(define-read-only (cost_analysis_storage (n uint))
    {
        runtime: (linear n u2 u100),
        write_length: (linear n u1 u1),
        write_count: u1,
        read_count: u1,
        read_length: u1
    })

(define-read-only (cost_analysis_use_trait_entry (n uint))
    {
        runtime: (linear n u9 u723),
        write_length: (linear n u1 u1),
        write_count: u0,
        read_count: u1,
        read_length: (linear n u1 u1)
    })


(define-read-only (cost_analysis_get_function_entry (n uint))
    {
        runtime: (linear n u81 u1303),
        write_length: u0,
        write_count: u0,
        read_count: u1,
        read_length: (linear n u1 u1)
    })


(define-read-only (cost_analysis_fetch_contract_entry (n uint))
    {
        runtime: (linear n u1000 u1000),
        write_length: u0,
        write_count: u0,
        read_count: u1,
        read_length: (linear n u1 u1)
    })

(define-read-only (cost_lookup_variable_depth (n uint))
    (runtime (linear n u2 u14)))

(define-read-only (cost_lookup_variable_size (n uint))
    (runtime (linear n u2 u1)))

(define-read-only (cost_lookup_function (n uint))
    (runtime u16))

(define-read-only (cost_bind_name (n uint))
    (runtime u256))

(define-read-only (cost_inner_type_check_cost (n uint))
    (runtime (linear n u2 u9)))

(define-read-only (cost_user_function_application (n uint))
    (runtime (linear n u26 u140)))

(define-read-only (cost_let (n uint))
    (runtime (linear n u146 u862)))

(define-read-only (cost_if (n uint))
    (runtime u200))

(define-read-only (cost_asserts (n uint))
    (runtime u170))

(define-read-only (cost_map (n uint))
    (runtime (linear n u1210 u3314)))

(define-read-only (cost_filter (n uint))
    (runtime u460))

(define-read-only (cost_len (n uint))
    (runtime u486))

(define-read-only (cost_element_at (n uint))
    (runtime u619))

(define-read-only (cost_index_of (n uint))
    (runtime (linear n u1 u243)))

(define-read-only (cost_fold (n uint))
    (runtime u483))

(define-read-only (cost_list_cons (n uint))
    (runtime (linear n u14 u198)))

(define-read-only (cost_type_parse_step (n uint))
    (runtime u5))

(define-read-only (cost_tuple_get (n uint))
    (runtime (nlogn n u4 u1780)))

(define-read-only (cost_tuple_merge (n uint))
    (runtime (linear n u4 u646)))

(define-read-only (cost_tuple_cons (n uint))
    (runtime (nlogn n u11 u1101)))

(define-read-only (cost_add (n uint))
    (runtime (linear n u14 u157)))

(define-read-only (cost_sub (n uint))
    (runtime (linear n u14 u157)))

(define-read-only (cost_mul (n uint))
    (runtime (linear n u14 u157)))

(define-read-only (cost_div (n uint))
    (runtime (linear n u14 u157)))

(define-read-only (cost_geq (n uint))
    (runtime u170))

(define-read-only (cost_leq (n uint))
    (runtime u170))

(define-read-only (cost_le (n uint))
    (runtime u170))

(define-read-only (cost_ge (n uint))
    (runtime u170))

(define-read-only (cost_int_cast (n uint))
    (runtime u170))

(define-read-only (cost_mod (n uint))
    (runtime u170))

(define-read-only (cost_pow (n uint))
    (runtime u170))

(define-read-only (cost_sqrti (n uint))
    (runtime u170))

(define-read-only (cost_log2 (n uint))
    (runtime u170))

(define-read-only (cost_xor (n uint))
    (runtime u170))

(define-read-only (cost_not (n uint))
    (runtime u170))

(define-read-only (cost_eq (n uint))
    (runtime (linear n u7 u172)))

(define-read-only (cost_begin (n uint))
    (runtime u202))

(define-read-only (cost_hash160 (n uint))
    (runtime (linear n u1 u201)))

(define-read-only (cost_sha256 (n uint))
    (runtime (linear n u1 u100)))

(define-read-only (cost_sha512 (n uint))
    (runtime (linear n u1 u176)))

(define-read-only (cost_sha512t256 (n uint))
    (runtime (linear n u1 u188)))

(define-read-only (cost_keccak256 (n uint))
    (runtime (linear n u1 u221)))

(define-read-only (cost_secp256k1recover (n uint))
    (runtime u14344))

(define-read-only (cost_secp256k1verify (n uint))
    (runtime u13540))

(define-read-only (cost_print (n uint))
    (runtime (linear n u3 u1413)))

(define-read-only (cost_some_cons (n uint))
    (runtime u230))

(define-read-only (cost_ok_cons (n uint))
    (runtime u230))

(define-read-only (cost_err_cons (n uint))
    (runtime u230))

(define-read-only (cost_default_to (n uint))
    (runtime u287))

(define-read-only (cost_unwrap_ret (n uint))
    (runtime u339))

(define-read-only (cost_unwrap_err_or_ret (n uint))
    (runtime u339))

(define-read-only (cost_is_okay (n uint))
    (runtime u287))

(define-read-only (cost_is_none (n uint))
    (runtime u287))

(define-read-only (cost_is_err (n uint))
    (runtime u287))

(define-read-only (cost_is_some (n uint))
    (runtime u287))

(define-read-only (cost_unwrap (n uint))
    (runtime u287))

(define-read-only (cost_unwrap_err (n uint))
    (runtime u287))

(define-read-only (cost_try_ret (n uint))
    (runtime u287))

(define-read-only (cost_match (n uint))
    (runtime u287))

(define-read-only (cost_or (n uint))
    (runtime (linear n u3 u149)))

(define-read-only (cost_and (n uint))
    (runtime (linear n u3 u149)))

(define-read-only (cost_append (n uint))
    (runtime (linear n u71 u176)))

(define-read-only (cost_concat (n uint))
    (runtime (linear n u75 u244)))

(define-read-only (cost_as_max_len (n uint))
    (runtime u475))

(define-read-only (cost_contract_call (n uint))
    (runtime u153))

(define-read-only (cost_contract_of (n uint))
    (runtime u13400))

(define-read-only (cost_principal_of (n uint))
    (runtime u999))


(define-read-only (cost_at_block (n uint))
    {
        runtime: u210,
        write_length: u0,
        write_count: u0,
        read_count: u1,
        read_length: u1
    })


(define-read-only (cost_load_contract (n uint))
    {
        runtime: (linear n u1 u157),
        write_length: u0,
        write_count: u0,
        ;; set to 3 because of the associated metadata loads
        read_count: u3,
        read_length: (linear n u1 u1)
    })


(define-read-only (cost_create_map (n uint))
    {
        runtime: (linear n u1 u1631),
        write_length: (linear n u1 u1),
        write_count: u1,
        read_count: u0,
        read_length: u0
    })


(define-read-only (cost_create_var (n uint))
    {
        runtime: (linear n u7 u2152),
        write_length: (linear n u1 u1),
        write_count: u2,
        read_count: u0,
        read_length: u0
    })


(define-read-only (cost_create_nft (n uint))
    {
        runtime: (linear n u1 u1610),
        write_length: (linear n u1 u1),
        write_count: u1,
        read_count: u0,
        read_length: u0
    })


(define-read-only (cost_create_ft (n uint))
    {
        runtime: u1972,
        write_length: u1,
        write_count: u2,
        read_count: u0,
        read_length: u0
    })


(define-read-only (cost_fetch_entry (n uint))
    {
        runtime: (linear n u1 u1539),
        write_length: u0,
        write_count: u0,
        read_count: u1,
        read_length: (linear n u1 u1)
    })


(define-read-only (cost_set_entry (n uint))
    {
        runtime: (linear n u4 u2204),
        write_length: (linear n u1 u1),
        write_count: u1,
        read_count: u1,
        read_length: u0
    })


(define-read-only (cost_fetch_var (n uint))
    {
        runtime: (linear n u1 u543),
        write_length: u0,
        write_count: u0,
        read_count: u1,
        read_length: (linear n u1 u1)
    })


(define-read-only (cost_set_var (n uint))
    {
        runtime: (linear n u5 u691),
        write_length: (linear n u1 u1),
        write_count: u1,
        read_count: u1,
        read_length: u0
    })


(define-read-only (cost_contract_storage (n uint))
    {
        runtime: (linear n u13 u7982),
        write_length: (linear n u1 u1),
        write_count: u1,
        read_count: u0,
        read_length: u0
    })


(define-read-only (cost_block_info (n uint))
    {
        runtime: u6321,
        write_length: u0,
        write_count: u0,
        read_count: u1,
        read_length: u1
    })


(define-read-only (cost_stx_balance (n uint))
    {
        runtime: u1385,
        write_length: u0,
        write_count: u0,
        read_count: u1,
        read_length: u1
    })


(define-read-only (cost_stx_transfer (n uint))
    {
        runtime: u1430,
        write_length: u1,
        write_count: u1,
        read_count: u1,
        read_length: u1
    })


(define-read-only (cost_ft_mint (n uint))
    {
        runtime: u1645,
        write_length: u1,
        write_count: u2,
        read_count: u2,
        read_length: u1
    })


(define-read-only (cost_ft_transfer (n uint))
    {
        runtime: u612,
        write_length: u1,
        write_count: u2,
        read_count: u2,
        read_length: u1
    })


(define-read-only (cost_ft_balance (n uint))
    {
        runtime: u547,
        write_length: u0,
        write_count: u0,
        read_count: u1,
        read_length: u1
    })


(define-read-only (cost_nft_mint (n uint))
    {
        runtime: (linear n u9 u795),
        write_length: u1,
        write_count: u1,
        read_count: u1,
        read_length: u1
    })


(define-read-only (cost_nft_transfer (n uint))
    {
        runtime: (linear n u9 u795),
        write_length: u1,
        write_count: u1,
        read_count: u1,
        read_length: u1
    })


(define-read-only (cost_nft_owner (n uint))
    {
        runtime: (linear n u9 u795),
        write_length: u0,
        write_count: u0,
        read_count: u1,
        read_length: u1
    })


(define-read-only (cost_ft_get_supply (n uint))
    {
        runtime: u483,
        write_length: u0,
        write_count: u0,
        read_count: u1,
        read_length: u1
    })


(define-read-only (cost_ft_burn (n uint))
    {
        runtime: u612,
        write_length: u1,
        write_count: u2,
        read_count: u2,
        read_length: u1
    })


(define-read-only (cost_nft_burn (n uint))
    {
        runtime: (linear n u9 u795),
        write_length: u1,
        write_count: u1,
        read_count: u1,
        read_length: u1
    })


(define-read-only (poison_microblock (n uint))
    {
        runtime: u29568,
        write_length: u1,
        write_count: u1,
        read_count: u1,
        read_length: u1
    })
```

### Determining runtime cost values

The goal of this proposal is to make the total real runtime of a full
block less than 30 seconds. 30 seconds is a short enough period of
time that prospective miners should be able to process a new block
before the next Bitcoin block 95% of the time (`exp( -1/20 ) ~= 95%`).

To determine a new proposed cost for a Clarity function, we executed a
set of benchmarks for each Clarity cost function in the
[clarity-benchmarking](https://github.com/blockstack/clarity-benchmarking)
Github repository. After running these benchmarks, constant factors in
the runtime functions were fitted using linear regression (given a
transform). These benchmarks produced regression fitted functions for
each Clarity cost function, for example:

```
runtime_ns(cost_secp256k1verify) = 8126809.571429
runtime_ns(cost_or) = 2064.4713444648587 * input_len + 91676.397154
```

The runtime block limit in the Stacks network is `5e9` (unitless), and
the goal of this proposal is that this should correspond to 30 seconds
or `3e10` nanoseconds. So, to convert the `runtime_ns` functions into
runtimes for the Stacks network, we have the simple conversion:

```
runtime_stacks = runtime_ns * 5e9 / 3e10ns
```

For running the benchmarks and analysis in the `clarity-benchmarking`
repository, see the [`README.md`](https://github.com/blockstack/clarity-benchmarking/blob/master/README.md)
file in that repository.



================================================
FILE: sips/sip-012/scripts/README.md
================================================
# SIP 012 Vote Tabulation Script

The main script is `count-votes.sh`.  It will count up the votes for/against SIP 012 for a given reward cycle.  See `count-votes.sh` for detailed usage information.

Sample run:

```
$ cat stackers-19.json delegating.json | ./count-votes.sh /tmp/tally-19 4933b0b002a854a9ca7305166238d17be018ce54e415530540aa7e620e9cd86d 705850
{"yes":"10194020608227","no":"0"}
$ cat stackers-20.json delegating.json | ./count-votes.sh /tmp/tally-20 7ae943351df455aab1aa69ce7ba6606f937ebab5f34322c982227cd9e0322176 707951
{"yes":"77064706545373","no":"0"}
```

To generate the artifacts `stackers-19.json`, `stackers-20.json`, and `delegating.json` from a Stacks node's debug log file, run the following:

```
$ ./generate-artifacts.sh /path/to/node/log.txt
```



================================================
FILE: sips/sip-012/scripts/extract-delegates.sh
================================================
#!/bin/bash

############################################################
# Script to extract all STX addresses that are delegating.
#
# Usage: ./extract-delegates.sh REWARD-CYCLE < DEBUG-LOG-FILE
############################################################

set -oue pipefail

FIRST_BLOCK=666050
REWARD_CYCLE_LENGTH=2100

# DEBG [1635816373.424732] [src/vm/functions/special.rs:81] [chains-coordinator] Handle special-case contract-call to QualifiedContractIdentifier { issuer: StandardPrincipalData(SP000000000000000000002Q6VF78), name: ContractName("pox") } delegate-stack-stx (which returned Response(ResponseData { committed: false, data: Int(3) }))
# DEBG [1635816373.394132] [src/vm/functions/special.rs:81] [chains-coordinator] Handle special-case contract-call to QualifiedContractIdentifier { issuer: StandardPrincipalData(SP000000000000000000002Q6VF78), name: ContractName("pox") } delegate-stack-stx (which returned Response(ResponseData { committed: true, data: Tuple(TupleData { type_signature: TupleTypeSignature { "lock-amount": uint, "stacker": principal, "unlock-burn-height": uint,}, data_map: {ClarityName("lock-amount"): UInt(6000000000000), ClarityName("stacker"): Principal(Standard(StandardPrincipalData(SP2G4JFB3WWBWPVGEDNBTMEVJB6DNDR468G0S03AX))), ClarityName("unlock-burn-height"): UInt(680750)} }) }))
#
# becomes
#
# ""
# {"address": "SP2G4JFB3WWBWPVGEDNBTMEVJB6DNDR468G0S03AX", "delegating": "1", "until": "680750"}
extract_delegate() {
   # stdin: a DEBUG-level logfile
   # stdout: JSON describing each PoX lock event
   gawk '
{
   addr_field = "";
   for (i = 38; i <= NF; i++) {
      if ($i != "") {
          addr_field = addr_field " " $i
      }
   }
   found = 0
   address = ""
   is_contract = match(addr_field, /QualifiedContractIdentifier \{ issuer: StandardPrincipalData\(([^)]+)\), name: ContractName\("([^"]+)"\)/, parts)
   if (is_contract) {
      address = parts[1] "." parts[2]
      found = 1
   }
   else {
      is_standard = match(addr_field, /Standard\(StandardPrincipalData\(([^)]+)\)\)/, parts)
      if (is_standard) {
         address = parts[1]
         found = 1
      }
   }

   found_lock_height = match(addr_field, /ClarityName\("unlock-burn-height"\): UInt\(([0-9]+)\)/, parts)
   if (found && found_lock_height) {
      printf "{\"address\":\"" address "\",\"type\":\"delegation\",\"until\":\"" parts[1] "\"}\n"
   }
}
'
}

grep 'Handle special-case contract-call' | grep 'delegate-stack-stx' | grep 'committed: true' | extract_delegate



================================================
FILE: sips/sip-012/scripts/extract-stackers.sh
================================================
#!/bin/bash

############################################################
# Script to extract all STX addresses that are stacking
# in a particular reward cycle, given access to a node's
# debug log file.
#
# Usage: ./extract-stackers.sh REWARD-CYCLE < DEBUG-LOG-FILE
############################################################

set -oue pipefail

FIRST_BLOCK=666050
REWARD_CYCLE_LENGTH=2100

# DEBG [1635829849.697968] [src/chainstate/stacks/db/accounts.rs:298] [chains-coordinator] PoX lock 604260000 uSTX (new balance 6104) until burnchain block height 689150 for Standard(StandardPrincipalData(SP2WGGG8E7NVFA0W4YZ87M6R09TNJ33CEBAXB9QPB))
# DEBG [1635941010.356021] [src/chainstate/stacks/db/accounts.rs:298] [chains-coordinator] PoX lock 12622260119595 uSTX (new balance 0) until burnchain block height 714350 for Contract(QualifiedContractIdentifier { issuer: StandardPrincipalData(SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR), name: ContractName("arkadiko-stacker-v1-1") })
#
# becomes
#
# {"type";"stacker", "locked":"604260000","until":"689150","address":"SP2WGGG8E7NVFA0W4YZ87M6R09TNJ33CEBAXB9QPB"}
# {"type":"stacker", "locked":"12622260119595","until":"714350","address":"SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-stacker-v1-1"}
extract_stacker() {
   # stdin: a DEBUG-level logfile
   # stdout: JSON describing each PoX lock event
   gawk '
{
   num_locked = $7
   until = $16
   addr_field = "";
   for (i = 18; i <= NF; i++) {
      if ($i != "") {
          addr_field = addr_field " " $i
      }
   }
   found = 0
   address = ""
   is_contract = match(addr_field, /QualifiedContractIdentifier \{ issuer: StandardPrincipalData\(([^)]+)\), name: ContractName\("([^"]+)"\)/, parts)
   if (is_contract) {
      address = parts[1] "." parts[2]
      found = 1
   }
   else {
      is_standard = match(addr_field, /Standard\(StandardPrincipalData\(([^)]+)\)\)/, parts)
      if (is_standard) {
         address = parts[1]
         found = 1
      }
   }

   if (found) {
      printf "{\"address\":\"" address "\",\"type\":\"stacker\",\"locked\":\"" num_locked "\",\"until\":\"" until "\"}\n"
   }
}
'
}

block_height_to_reward_cycle() {
   # $1: burnchain block height
   # stdin: none
   # stdout: reward cycle
   local block_height="$1"
   echo $(( ($block_height - $FIRST_BLOCK) / $REWARD_CYCLE_LENGTH ))
}

stacking_in_reward_cycle() {
   # $1: reward cycle number
   # stdin: output from extract_stacker
   # stdout: the JSON blobs that are stacking within this reward cycle
   local target_reward_cycle="$1"
   local json=""
   local reward_cycle=0
   local first_block=0
   local until_ht=0

   while IFS= read -r json; do
      until_ht="$(echo "$json" | jq -rc '.until')"
      reward_cycle="$(block_height_to_reward_cycle "$until_ht")"

      # echo >&2 "Until reward cycle $reward_cycle: $json"

      if (( "$reward_cycle" > "$target_reward_cycle" )); then
         echo "$json"
      fi
   done
   return 0
}

target_reward_cycle="$1"
grep ' PoX lock ' | extract_stacker | stacking_in_reward_cycle "$target_reward_cycle"



================================================
FILE: sips/sip-012/scripts/generate-artifacts.sh
================================================
#!/bin/bash

# NOTE: not tested.  Reconstructed from bash history.

LOGFILE="$1"
if [ -z "$LOGFILE" ]; then
   echo >&2 "Usage: $0 NODE-LOGFILE.out"
   exit 1
fi

# get PoX lockup and delegate-stack-stx events
grep -F '[chains-coordinator] PoX lock ' "$LOGFILE" > ./pox-lock.out
grep -F 'Handle special-case contract-call' "$LOGFILE" | grep 'delegate-stack-stx' > ./delegate-pox-lock.out

# extract log entries to JSON stacker records
./extract-stackers.sh 19 < ./pox-lock.out > stackers-19-raw.json
./extract-stackers.sh 20 < ./pox-lock.out > stackers-20.json

# consider stackers that only stacked in 19, not 20
echo -n "" > stackers-19.json
while read -r json; do
   addr="$(echo "$json" | jq -r -c '.address')"
   if ! grep -F "$addr" stackers-20.json >/dev/null; then
      echo "$json" >> stackers-19.json
   fi
done < ./stackers-19-raw.json

# extract log entries to JSON delegate records
./extract-delegates.sh < ./delegate-pox-lock.out | sort | uniq > delegating.json



================================================
FILE: sips/sip-012/scripts/stackers-19.json
================================================
{"address":"SM14T5JTCX46RXV2RW4QBKYNPFXF5PJGSBD2X7SH2","type":"stacker","locked":"500000","until":"708050"}
{"address":"SM19HFRTPVXMR2BXXFV3M6YHQNBA1APR6CYWX21RP","type":"stacker","locked":"386000000000","until":"708050"}
{"address":"SM2CC48KX8HASDE0BR9HXWCBJMK7T2YV9BFKZ83X2","type":"stacker","locked":"9940000000000","until":"708050"}
{"address":"SM3B4ZX0TM5R27DJ1MGTJX73C7P1V8406M5QGVDC6","type":"stacker","locked":"13000000000000","until":"708050"}
{"address":"SP02A0EY3X890QQRT8KWCFA8YQ5N59SXXC52BEXC","type":"stacker","locked":"595000000","until":"708050"}
{"address":"SP10EN1KAHBF1MECMD6XY6FKYPQXMT6WTPPN9FBHE","type":"stacker","locked":"41666913600","until":"708050"}
{"address":"SP10SYKPCC91PH34CP6KN6K409HT6ARTGFZPYDP1N","type":"stacker","locked":"200000000","until":"708050"}
{"address":"SP11W1YTM3TMR9ZDD7F6FAD53BQJ1ED9N575M5GX8","type":"stacker","locked":"18700000000","until":"708050"}
{"address":"SP1239SRF7MPS2WXYDVTPJ2V4ZBE2TDCV5NY42ZAM","type":"stacker","locked":"13001000000","until":"708050"}
{"address":"SP123TY61PFFAEZBX3PNH7KG3663B3GBW440NMYX0","type":"stacker","locked":"5895000000","until":"708050"}
{"address":"SP129N2D7NMT70Z76FKGPXTJ8Q76D8FGZ5GVXSQN7","type":"stacker","locked":"24700000000","until":"708050"}
{"address":"SP12YQQY1NQ58VCXVEBCDN18NGFACZJ4TPVXAJ14R","type":"stacker","locked":"800000000","until":"708050"}
{"address":"SP1308DQKXZK593BES4GV419HMM3X94MM3TSVFA88","type":"stacker","locked":"750000000","until":"708050"}
{"address":"SP13646A651GQNPJ2VYHB0K12WGQN93Q7GTFV1C8M","type":"stacker","locked":"361073000000","until":"708050"}
{"address":"SP13CM9QN6J23B6T6415SC0T8JQZ3YADPD1TJ27WZ","type":"stacker","locked":"220000000000","until":"708050"}
{"address":"SP143YPY0K388CKX1T5KH79GSW90RH49NSRZVTT0M","type":"stacker","locked":"50000000","until":"708050"}
{"address":"SP14JMK7YAHGS3296HBCMKXJN23WA9EC5BMA8WV2H","type":"stacker","locked":"68000000000","until":"708050"}
{"address":"SP14PMGHFNVXZ3N1V1VG6EJA0WH0G0Q8F0RGMYFE2","type":"stacker","locked":"238100000","until":"708050"}
{"address":"SP14SVGY4HTE0YMMQ3K6YYTPGKGY5V2NN15AY7XNZ","type":"stacker","locked":"99913600","until":"708050"}
{"address":"SP15S478J9ZMR77N501EMJADSEGAFGPT0ZZ9E9R8A","type":"stacker","locked":"1056000000","until":"708050"}
{"address":"SP16Q13XQMWST2Z842WXM0A5PWSNA6TQTPM18PK41","type":"stacker","locked":"1500000000000","until":"708050"}
{"address":"SP17AJ04SD5YYB9G5CPC1GHHC2VN6EA3PPM3SH6YW","type":"stacker","locked":"90000000000","until":"708050"}
{"address":"SP17DGYKZ8GKW8TRKE53WE6B0MVEZGXZQWRGS6SGM","type":"stacker","locked":"330000000","until":"708050"}
{"address":"SP187ERJYDSY1YDRSDTZDD2D6HM64YQB985WQ8QJ2","type":"stacker","locked":"12500000000","until":"708050"}
{"address":"SP1934QK1ZXGCEBB3MN9Y0FNR20GMDWM3Y5P5VV5","type":"stacker","locked":"1340000000","until":"708050"}
{"address":"SP19M6N5ADWN8ABGKTG75GENB99W32S4A7SVV0HJS","type":"stacker","locked":"499000000","until":"708050"}
{"address":"SP19RF4WJTWT149FQB9QGMW9N409GACD9EFVPYHFH","type":"stacker","locked":"4083000000","until":"708050"}
{"address":"SP1A8XCMT0MCX1153T2FSSJ58ESV8JVN9CFEK06DT","type":"stacker","locked":"412045000000","until":"708050"}
{"address":"SP1ABCNVR5VR8ESY2V50DYJFPBFN3TVRQNS0P3JFK","type":"stacker","locked":"1326000000","until":"708050"}
{"address":"SP1AHD995X0SJ8YSQF1FHGW5JG9TTKC5XADTMYPCA","type":"stacker","locked":"253657056","until":"708050"}
{"address":"SP1ASE7R0KDK8Z7E20VH1GQ6CXHFTTKRWZ3C5SH8Y","type":"stacker","locked":"583000000","until":"708050"}
{"address":"SP1AXVHRZMNPE4621HWPSKD18FS4GM96KSAC82RER","type":"stacker","locked":"47688999801","until":"708050"}
{"address":"SP1AYVSC81FQAFDYJ1RRMQAK8TWB40ETKEP1Z6M4Y","type":"stacker","locked":"51000000000","until":"708050"}
{"address":"SP1B35DSEAKN6JCRYYC3161G4CD7P1W7NJGV8HZ89","type":"stacker","locked":"3500000000000","until":"708050"}
{"address":"SP1B717ATWZEZ8GGBAHGSDXDJ3JHADD4R1Q16R1HK","type":"stacker","locked":"140000000000","until":"708050"}
{"address":"SP1BZC0PXGMJEM1972G2ZGEFEDTWKWERXFKWN6QFJ","type":"stacker","locked":"3685570000","until":"708050"}
{"address":"SP1BZEGCBVBZ25N5QS736CC33JM3VRJ9Q6TXG0TDD","type":"stacker","locked":"2840666938","until":"708050"}
{"address":"SP1D1F5XHQ2Y8X04HX66ECHPP27M5V0ZZKSGZXY25","type":"stacker","locked":"120000000000","until":"708050"}
{"address":"SP1D2P4A6EV88CNSKFN9JHXMZ5PN9YQRKBNXBEKA8","type":"stacker","locked":"1500000000","until":"708050"}
{"address":"SP1DZGPXNERQ9PZV92SYZASXK0GS5T3RSAMMF991J","type":"stacker","locked":"1190000000","until":"708050"}
{"address":"SP1E32XK54WWBFM0QTBNT44RV69201CZMRV2ZKKA3","type":"stacker","locked":"102720513","until":"708050"}
{"address":"SP1E9GBZ7VQHRQQMAF89VGRAPBNCYQ7NHRKX1EP6R","type":"stacker","locked":"532540000","until":"708050"}
{"address":"SP1ET0MKG8DZJHC7Q7MVGGYVRM726GBHWMQ6BD1J6","type":"stacker","locked":"222530457","until":"708050"}
{"address":"SP1F5DSY5TBFHXG80RV02N0CMRABSMCSM83A4STR0","type":"stacker","locked":"13690341486","until":"708050"}
{"address":"SP1F7WF2XCPP7Y91FZ16AVZD5Z8EDECW88WR7T1EC","type":"stacker","locked":"500000000","until":"708050"}
{"address":"SP1FBF62CJDWKM6CWVFK3R4R14JWAYNEF95E4Y7XD","type":"stacker","locked":"1000000000","until":"708050"}
{"address":"SP1FS1TV4FXBBH8AHC6Y0F8PHEKAAK8N85A61V35J","type":"stacker","locked":"9284000000","until":"708050"}
{"address":"SP1FV3SN48RVHHQF7456N62G5NW768B8YM44M3AV1","type":"stacker","locked":"40000000","until":"708050"}
{"address":"SP1FZEDKMD9736NAWS1V6Z33KBKKY4WN9JHJXCQX6","type":"stacker","locked":"135864000","until":"708050"}
{"address":"SP1G69A01K850YT1RN5QG822Q2NPTF3QS4YPYSBDZ","type":"stacker","locked":"20000000000","until":"708050"}
{"address":"SP1GDDQCAHQJ9F7WV3953CH4KXS7KMKSSMT0M20AG","type":"stacker","locked":"110330000000","until":"708050"}
{"address":"SP1GRRA4P0VHKPRF3MKNX9XD5CPBTCYQE6P1JZ2W9","type":"stacker","locked":"11999997035","until":"708050"}
{"address":"SP1HB7779C8GNDQ4VT7CTN9APSKK48XJ8PJAKTGFT","type":"stacker","locked":"1300000000","until":"708050"}
{"address":"SP1HMKBV1K727NMYZFDE237RG2NT6G92M3S6868WG","type":"stacker","locked":"50000000","until":"708050"}
{"address":"SP1J8KDC28HTF338MZJ49SNXXM9Z7GGS0KJQ0TSDG","type":"stacker","locked":"8338892899","until":"708050"}
{"address":"SP1JSE79G093C17XZNAQAVBKAX2K551KGVDZC5Z76","type":"stacker","locked":"3325000000","until":"708050"}
{"address":"SP1K9C1C760CSW669YV5J2FJ4K9VNK8J1R9N1GH49","type":"stacker","locked":"3200000000","until":"708050"}
{"address":"SP1K9YACPRZ8PMVA3QX20JN444W1S30QFSEEQ0QWN","type":"stacker","locked":"5779999801","until":"708050"}
{"address":"SP1KMRW2G1ZB200ND2JP1VP99GBBGC4FEFTQ28W6F","type":"stacker","locked":"2518000000","until":"708050"}
{"address":"SP1KPD871XYW30DTWSSG56XPVDC7253P5ZZN363P9","type":"stacker","locked":"1000000000","until":"708050"}
{"address":"SP1KWZ8MQA40FF6EXK4G6SMF06B6SZ5FVKQYC5YQT","type":"stacker","locked":"2020913600","until":"708050"}
{"address":"SP1M1ATHN7NP5ZNFKE4Q53JR7P6FAZT76AJ2VVYXX","type":"stacker","locked":"150000000","until":"708050"}
{"address":"SP1ME1TS4Z46T83K4HPQHGV3Q3VX2NF758FFCBWPW","type":"stacker","locked":"99000000","until":"708050"}
{"address":"SP1MJ8FNYZHE19H8YFJ624ZEEXAEB69B80G3DQ0XK","type":"stacker","locked":"4476638285","until":"708050"}
{"address":"SP1MS7KGA5WESV319PV9GVKW2FFJJ1YNT9ETC6FQC","type":"stacker","locked":"4000000000","until":"708050"}
{"address":"SP1N06Z1498FKVCB9QK4TYEKQ70XCKFCXH4BEYEC4","type":"stacker","locked":"82332000000","until":"708050"}
{"address":"SP1Q3VA4YYDAFY7WQVQGZYGH0D232BM4DV2KF7T1S","type":"stacker","locked":"92406500","until":"708050"}
{"address":"SP1QAHRV4H9X0QTBD4SDF2XTQQZXQG6SQ7XVTE0K8","type":"stacker","locked":"103348000000","until":"708050"}
{"address":"SP1QJBEHS9P9S3D91GWDAV1SQAA9613TWBGCC9EYS","type":"stacker","locked":"7989000000","until":"708050"}
{"address":"SP1R1HND0ZXGFZXQCRKQ1PNR1ADA7ZJHJMKVJ1HCJ","type":"stacker","locked":"324950000","until":"708050"}
{"address":"SP1R6YS229G7TV47ZEZ33CDQBS7AQR3QJSY3MNF4F","type":"stacker","locked":"500000000","until":"708050"}
{"address":"SP1R8NFPFGFPVM7DCCVQ4HBJ83QJA5ZGW50CRK9RB","type":"stacker","locked":"2043918584","until":"708050"}
{"address":"SP1S2EN7AHYH41P9DSYW0VM8FRHSDD77CFA3A7H3T","type":"stacker","locked":"40000000000","until":"708050"}
{"address":"SP1S3K579FJQNHVNBBXT5WZSTFMT95HS018WWB0AT","type":"stacker","locked":"14994000000","until":"708050"}
{"address":"SP1T0NKGCAZZKCKNVMAW60DDZ9QC5XAD8C4QDD3PP","type":"stacker","locked":"100000000","until":"708050"}
{"address":"SP1T2SV6451HSZPJH9YBFWDM69ZPEVXM86HM597XJ","type":"stacker","locked":"99913600","until":"708050"}
{"address":"SP1TD345DMS67CJQJR8S9FQ95M9ZSHDHYTJ4SK4VS","type":"stacker","locked":"442969801","until":"708050"}
{"address":"SP1TQ2BKXYWJ2W8DCKQSP94CTHYC8EKJT7T1Y09D8","type":"stacker","locked":"1200000000","until":"708050"}
{"address":"SP1TWA0K60WB961W7QJQKHTASNQXZEEP36V15TFGQ","type":"stacker","locked":"6256378400","until":"708050"}
{"address":"SP1V7NRPKG7XHGNBZ5HGQ42SM90VNF2Y5YXY0RDA7","type":"stacker","locked":"262190000","until":"708050"}
{"address":"SP1VDP51TS04PWRK4DBPY64T8M1GY85Q1QX8WDVFN","type":"stacker","locked":"186000000","until":"708050"}
{"address":"SP1VM3P7H4N82DK1WDVFT50GDHZKX3ZH7XSN8KNP1","type":"stacker","locked":"500000000","until":"708050"}
{"address":"SP1W8C25TZCXDQTAR7MZQPSNF8C73274DCNT2NWJZ","type":"stacker","locked":"100000000000","until":"708050"}
{"address":"SP1WQ59358VCM82GSVREYF4RZ02QXVZ1WXRCZSCPG","type":"stacker","locked":"2400000000","until":"708050"}
{"address":"SP1X2WX4RS1GBDF3KNS4XXJ718XRPJ77A4XNXH2ZY","type":"stacker","locked":"5000000000","until":"708050"}
{"address":"SP1XDN5MVZ732N4TSPS7A4PGTY2VKBN2VYY823R8D","type":"stacker","locked":"422870303","until":"708050"}
{"address":"SP1XTAXYRTSKMZFV6PTNGHJWKFTS2KVJK5GZYF38J","type":"stacker","locked":"17699618079","until":"708050"}
{"address":"SP1Y5603BG64PND9X5V59FPZATPTFWSQHQMWFHJ9D","type":"stacker","locked":"22575590063","until":"708050"}
{"address":"SP1YFA8FW983BDZXH87KH80795172E3Y9XC5VTTK9","type":"stacker","locked":"98313600","until":"708050"}
{"address":"SP1YYBMTZVG18PBVB4XTSK7TTWDJJ3C6TZXSNMAJ0","type":"stacker","locked":"42710000000","until":"708050"}
{"address":"SP1Z7CW5WDWMJ6WFKE1CRF41V8C4YD911HYGH0WF8","type":"stacker","locked":"600000000","until":"708050"}
{"address":"SP1ZHD36QBDRN42X4X5ZVEVBWKAXTMMA3BKNYWDY1","type":"stacker","locked":"395000000","until":"708050"}
{"address":"SP1ZHDJ95YEJ9PZPYPF95FMWDKWCQSWRAQWQHYWDP","type":"stacker","locked":"505000000","until":"708050"}
{"address":"SP2009K5G8DGFY7F4ZDRT9K1JP9CKTBZC5WFJZAD7","type":"stacker","locked":"205394050000","until":"708050"}
{"address":"SP207D4A7XMNGA7JJ34FD724A0NYV7K7MYDWK9T21","type":"stacker","locked":"200000000","until":"708050"}
{"address":"SP207R9N5VTFS6H2G0CFKZ6JB6AHBYN7E2FR0M0DN","type":"stacker","locked":"24999999801","until":"708050"}
{"address":"SP20BZFPPQMEGSG1NPZRQE0JTFXF68EQW4JZD69EZ","type":"stacker","locked":"100000000","until":"708050"}
{"address":"SP20GSBGFKJZECGP932GQQSZT83KXF4HC7KPF65QF","type":"stacker","locked":"290000000","until":"708050"}
{"address":"SP20J1SD14FXX9VE6GC4QKSPP2F3JNF5WVDZR4TYZ","type":"stacker","locked":"374999000000","until":"708050"}
{"address":"SP20JMXFT8QRYES7Q1ZNTWPAXACETHGSWV9A0EDEP","type":"stacker","locked":"1360000000","until":"708050"}
{"address":"SP221CDNSRGS6CM4BCJGKCQDYG03JTBCF8RX42D01","type":"stacker","locked":"500000000","until":"708050"}
{"address":"SP228WEAEMYX21RW0TT5T38THPNDYPPGGVW2RP570","type":"stacker","locked":"400000000","until":"708050"}
{"address":"SP22J0TQ6YA0EB70YD3GW24A9BEGDEA3XA5TAB9SQ","type":"stacker","locked":"110697000000","until":"708050"}
{"address":"SP22Z57B3PH87F0EAH9AEVP01RDZX9K8JT03G552G","type":"stacker","locked":"543000000","until":"708050"}
{"address":"SP22ZJZ1KETW298FXKV58RF95VB2MQSQ0807BBM5P","type":"stacker","locked":"1306218300","until":"708050"}
{"address":"SP2389QCGHF3EFNSZAKQDA8SS3SW8KR24D7Z06HHC","type":"stacker","locked":"773720000000","until":"708050"}
{"address":"SP23EW35J2RW3JD815W9S53SXX97N679GW221HSSA","type":"stacker","locked":"67000000","until":"708050"}
{"address":"SP246HMXWGY3WF7VRZB3E5E2YPTM0ZRXXMFTTVZ5S","type":"stacker","locked":"2000000000","until":"708050"}
{"address":"SP24AFQEDS4HR26P2NFBYH0VPCXHJ637QMC6ABFK5","type":"stacker","locked":"385229000000","until":"708050"}
{"address":"SP24GQ60GT3G3NSX7090YRR8DBMFF2NXTW1GHD4AD","type":"stacker","locked":"500000000000","until":"708050"}
{"address":"SP24JRWPM2YBXCV0SKR820JPTVEQK9NYNWMZPE7CV","type":"stacker","locked":"1443000000","until":"708050"}
{"address":"SP24TN44EK3MPAPQVGSGQ5EH0DGBKSHT3BKQJB924","type":"stacker","locked":"25000000000","until":"708050"}
{"address":"SP24WE3BZTDPH2M5RF0H8HDETG3V7424R3YR5BSNM","type":"stacker","locked":"33982671446","until":"708050"}
{"address":"SP2570YNWG8EEP37V68KJ3PK35AN8691CDY6GZR2G","type":"stacker","locked":"2500000000","until":"708050"}
{"address":"SP25SQR5GE76ED6KA2ZBVHRDRQ7537R7ZT8J0FD0W","type":"stacker","locked":"672929134","until":"708050"}
{"address":"SP25X4TZBD3GFAZ6ER897QXJ318SBEPT9RCTM03BS","type":"stacker","locked":"2000000000","until":"708050"}
{"address":"SP25ZA03RTFHTDJT9M5GNX8QV1YJRJA2J47PQFBSY","type":"stacker","locked":"101560000000","until":"708050"}
{"address":"SP26Z4AHW28NZQMKYRH2NBCEMN1BMZY2W8ZPDHDWF","type":"stacker","locked":"538000000","until":"708050"}
{"address":"SP272G79GSJB7BZ66PRF3GBS9VKS65J3F9B5VS901","type":"stacker","locked":"200000000000","until":"708050"}
{"address":"SP273XN645XQ35KPGSCYH1R7AFA7D9DSGCM1E66J0","type":"stacker","locked":"1185000000","until":"708050"}
{"address":"SP27EQH5ASYBRMKD7A1RFE7HX44SPXETAB9R8QTVS","type":"stacker","locked":"36500000000","until":"708050"}
{"address":"SP27S5Y9P81XX2PZC28GQ687B8CYWW2E0B54GNXWB","type":"stacker","locked":"300000000","until":"708050"}
{"address":"SP281EDFY54S0GCDTKPEKP6K32Y8VTJ6DC4KXTFY3","type":"stacker","locked":"7089391725","until":"708050"}
{"address":"SP287WSB9DMKVWND9JQKZ3H9TY9MSDV9QEQ8SJ3TP","type":"stacker","locked":"15000000000","until":"708050"}
{"address":"SP28FS6K7XZXJC8NMKV65W65T66C5D76TNFZWECW1","type":"stacker","locked":"4547000000","until":"708050"}
{"address":"SP294GG6MJJCHZ2BDV5PTMPK93MGYB2CY9VV5GG6D","type":"stacker","locked":"1718223659","until":"708050"}
{"address":"SP2A54X7G1JXYK5VQN4C5KHDHJV8RFJ9RJTSCVZGW","type":"stacker","locked":"1300000000","until":"708050"}
{"address":"SP2ABCYTA1WH4KZ9KMERHJP4EQJJCQDME66D5A1HH","type":"stacker","locked":"21874999008","until":"708050"}
{"address":"SP2B8XVVQN16VFKFKX7A5VGBNFE3WE3N8PHAD6HQ1","type":"stacker","locked":"1500000000","until":"708050"}
{"address":"SP2BNP9637394002WP5BSWK2SHS97JGRFRJ71Q394","type":"stacker","locked":"250000000","until":"708050"}
{"address":"SP2BQ782SESAYXACWCWDYP0Y4YVYVW0FBRQ384XX4","type":"stacker","locked":"100000000","until":"708050"}
{"address":"SP2C7EE8T80AHDCYD1HPZMJJXNMCFXGXDK7ME0M4G","type":"stacker","locked":"830000000","until":"708050"}
{"address":"SP2CQPK19120XS71E1D1YAMBSNVSJ3KJS70ABA9TC","type":"stacker","locked":"99913600","until":"708050"}
{"address":"SP2D39N30HS99R8VFKHMQJH1665WZSJPXSSDKSP25","type":"stacker","locked":"200000000","until":"708050"}
{"address":"SP2D784TEAPZH07FC1MY6CCK0R3ACNDGHR3FBSMKJ","type":"stacker","locked":"100086400","until":"708050"}
{"address":"SP2DD4SR9MPBRKCJVMFYFGPM4FY1VJ63E0BT8YA27","type":"stacker","locked":"2499000000","until":"708050"}
{"address":"SP2E15MCQG2HC7RDV5A88HSRTP80DPVYQPHGN1BV9","type":"stacker","locked":"500000000","until":"708050"}
{"address":"SP2EBZB4M75QYAA9XP9XY98PQQCCVMQAVDAT0CXCQ","type":"stacker","locked":"2400000000","until":"708050"}
{"address":"SP2ECKAWK4DRPM6AMP2QH3VFCP5DHKZBFWVEWTDNR","type":"stacker","locked":"40000000000","until":"708050"}
{"address":"SP2FN6XCY6D84YWJQJSBPBDYXPXMAQWP6A61AXE31","type":"stacker","locked":"700000000","until":"708050"}
{"address":"SP2FNPHR7YE49C9B8FNKN1R0RCASHMRDEZ71PZ5JY","type":"stacker","locked":"929841780","until":"708050"}
{"address":"SP2FP6FW5PQY1JWGSMKPD705F7XZSQ4PJ3JD52EG9","type":"stacker","locked":"1427000000","until":"708050"}
{"address":"SP2G6B6ARQ8R5MRE702JPXBDV7PVSW5HTS81GYQ7G","type":"stacker","locked":"5300000000","until":"708050"}
{"address":"SP2GA0B2HMKNV9GKFGGPTKWJHJ8TEYFBVMTC9FX6W","type":"stacker","locked":"3000000000","until":"708050"}
{"address":"SP2H1A16NZ2HS9SGHQ3ZFDV2ETQW5YD777CY9W31X","type":"stacker","locked":"1500000000","until":"708050"}
{"address":"SP2H4HFERWC4208VW51BPGT9C2J74MT1W5JDBGZAZ","type":"stacker","locked":"700000000","until":"708050"}
{"address":"SP2H5VVV8WABA2QZV2ZEJ81FG1P25J4CNB18ETTMD","type":"stacker","locked":"99000000","until":"708050"}
{"address":"SP2JMZ72A6PSENJK32KM86BH8CDA5MX6J841Y7T2S","type":"stacker","locked":"651136400","until":"708050"}
{"address":"SP2JPJED6E76TXTPF8V773VA8Q9Y3T5PFED2XME2J","type":"stacker","locked":"500000000","until":"708050"}
{"address":"SP2JVZ8BKVJE1GY3A6DH0JRAWDSPT0TVPW580RQQ1","type":"stacker","locked":"857000000","until":"708050"}
{"address":"SP2K2Y277FZ48627S2PGDH0Q0J0GBJCYSY4QYNPK6","type":"stacker","locked":"6000000000","until":"708050"}
{"address":"SP2KBD37DQCGGMAG2CKDAXA5AMYCWAH25B2TQ3ZET","type":"stacker","locked":"30972999060","until":"708050"}
{"address":"SP2KZZ20P68NKG1XW2CT98NHWEK5KS1CYCMV3GVF6","type":"stacker","locked":"13703595000","until":"708050"}
{"address":"SP2MAGHWK255EXCQ2ZSVBT31Z3CH702N6N6WSHX9G","type":"stacker","locked":"200000000","until":"708050"}
{"address":"SP2MW6VSVM0J6CTKCEZBCPQNAYAG790K3R0ME0ASZ","type":"stacker","locked":"1000000000","until":"708050"}
{"address":"SP2N27AWKMQEH9S9VDEYMZWS83PD9FKTVNM2MM6Z4","type":"stacker","locked":"550000000","until":"708050"}
{"address":"SP2N3Z3QHHMBEV2EPRZA1P83M213TPTCV5XD5HQ4X","type":"stacker","locked":"297919900","until":"708050"}
{"address":"SP2NK7DRRGAE9ZZ38NFPBGMK39XEA5CWKKKDW03BJ","type":"stacker","locked":"5000000000","until":"708050"}
{"address":"SP2PAZQWB6Y5G0TSMC0EXFDKG5AQEZ2AQTF388D28","type":"stacker","locked":"20000000000","until":"708050"}
{"address":"SP2PRBEX510TSNRT7T1JX8P59MSBSQHRTEM8S06GE","type":"stacker","locked":"8000000000","until":"708050"}
{"address":"SP2PXNWW3EA4WCVQS54E03T969TW51DW3SZBHFNR5","type":"stacker","locked":"300000000","until":"708050"}
{"address":"SP2Q79QN7YYTH4Y0X2H1CH0XKHG78HAPCXYCFPN4A","type":"stacker","locked":"2239000000","until":"708050"}
{"address":"SP2QGS35J9Z77GK73JPQZ080RJ7TWJJ620J9YTJBF","type":"stacker","locked":"95000000","until":"708050"}
{"address":"SP2R8C36A8KVBBWYC4ASD6V36S2E9VJ0FXWV2T4CP","type":"stacker","locked":"2500000000","until":"708050"}
{"address":"SP2RFZA63SZRX5CZRBHKFC01S4QVWP8P0NEZYX54F","type":"stacker","locked":"1314999604","until":"708050"}
{"address":"SP2RW80TCDT7ZQRG95HN5GVS8XQGYR3HN7CZE8SG","type":"stacker","locked":"20832913600","until":"708050"}
{"address":"SP2S0948DSAHCG5J5P2CF5WRW6V1BNJFS7XFRA5ZN","type":"stacker","locked":"450000000","until":"708050"}
{"address":"SP2S3TREKZAZARJ3VYS7Y8QYWKN8C4BBVZR1C4MZ6","type":"stacker","locked":"978584566000","until":"708050"}
{"address":"SP2SSHDSGHHEQN1A7Z0RP0YJ6QECE8TGQTYN594PM","type":"stacker","locked":"50000000","until":"708050"}
{"address":"SP2ST1HP2F24PTKNT2Y4AB19PZ5NY0HCP7M2ZJSEJ","type":"stacker","locked":"1977038245","until":"708050"}
{"address":"SP2SXNTK8H2ZF8Y9CW2EJEHVFBAVH8AK31RNJSZ59","type":"stacker","locked":"1020000000","until":"708050"}
{"address":"SP2TB9BR1WQ8TZTACRY4MWM27KGR85VQAM8BK49NE","type":"stacker","locked":"1300000000","until":"708050"}
{"address":"SP2TDGJZAGJWFSJAWQN2WBGR0TNEVV4CNWJBZ1SNC","type":"stacker","locked":"431000000","until":"708050"}
{"address":"SP2TZBMHPE6C37PAG6VPA1AGT310HCDGBF5GRCH6C","type":"stacker","locked":"50000000","until":"708050"}
{"address":"SP2V9ATCT5AGFSEP3WGCKQHNG26CKE3V3Q6WPRG46","type":"stacker","locked":"818265264","until":"708050"}
{"address":"SP2VCYZFK5JAPHWESXSJXB3CJABMVW3PAX8SWBPYC","type":"stacker","locked":"10000000000","until":"708050"}
{"address":"SP2WBXERYJXSH1RE9BJ9CY4A24R6SY3S1YC7G85AE","type":"stacker","locked":"2635000000","until":"708050"}
{"address":"SP2WKB7YWTPCVPNW5XVWSZQEQK07J91371WYV63TV","type":"stacker","locked":"3212000000","until":"708050"}
{"address":"SP2X40FDFC4GKM5P7ZA22QRAP4E6DVBGJKHXXED9N","type":"stacker","locked":"200000000","until":"708050"}
{"address":"SP2XESVQBJMNFZP4VQEBP3SJB69ANZZ2Y67CY07CP","type":"stacker","locked":"36925999801","until":"708050"}
{"address":"SP2XPYCM9ZYHFM119P57WM50S2CMQQ04G9ENRCPQG","type":"stacker","locked":"2500000000","until":"708050"}
{"address":"SP2XTWNFRKVC580XWRHW7DPCAF7NRQSPZXB0H00G7","type":"stacker","locked":"9668000000","until":"708050"}
{"address":"SP2Y4QYK69BYZV59FGPAFJ6K47MQBMA431YQ8R7ZY","type":"stacker","locked":"200000000","until":"708050"}
{"address":"SP2Y6M02JW7F2EFA4VEJFPN0YRWV6RVYP0J013GET","type":"stacker","locked":"50000000","until":"708050"}
{"address":"SP2YC41386MSKZVWWT0Q4R7YGY85PFTVCQ9QWKV3K","type":"stacker","locked":"200000000","until":"708050"}
{"address":"SP2YSD5XQQDT2P114BEY28H6YMJJ1RKKA4V9EFCE2","type":"stacker","locked":"2083333332","until":"708050"}
{"address":"SP2YSXDXE1E450S61V4VSZMZES3QNRASDH83P9D0D","type":"stacker","locked":"2018632317","until":"708050"}
{"address":"SP2Z6BJJZM6WGFJBRQQHKJPXJVQZEK85DVF96B5EZ","type":"stacker","locked":"79119800","until":"708050"}
{"address":"SP2Z93NTWX2ZC423723P1XXWTR2QNYBRYNZGP6T1M","type":"stacker","locked":"2000000000","until":"708050"}
{"address":"SP2ZBPK3HNMZ1V3Z1J1DDD9QCEEMHBDAPBY0QKQWS","type":"stacker","locked":"333330000","until":"708050"}
{"address":"SP2ZBSDRAYDFVH613N1MMRNGS313S7XKNSCJYZ83P","type":"stacker","locked":"72000000","until":"708050"}
{"address":"SP2ZT0BGFZX5V8DW2RCAJCT7YNNGR2ZXJT091ZBKZ","type":"stacker","locked":"3209000000","until":"708050"}
{"address":"SP3047EGCA1P4Q6FNDQHXJTH7JYWH96TJD21QB74A","type":"stacker","locked":"995000000","until":"708050"}
{"address":"SP30F2QAKR5TEN0FTK4XGPYBB8JHDRMNVE3QFKV47","type":"stacker","locked":"1000000000","until":"708050"}
{"address":"SP30GGD247PAQCS6WYM1QW9H21R1BXZ36A3AH4WZ9","type":"stacker","locked":"224000000","until":"708050"}
{"address":"SP31W6HP3MX51BTM1TM43AE2WEAK0ADE75P7Z871G","type":"stacker","locked":"98841600","until":"708050"}
{"address":"SP31WY87X4BNKJ9N39BW4E0KGR17FRJMB3VFF4ETH","type":"stacker","locked":"100000000","until":"708050"}
{"address":"SP325DAYKWK2AST79G24TTJ9E28CBEESGRG9XWCAF","type":"stacker","locked":"100000000","until":"708050"}
{"address":"SP32W4N2WK6JAHNTV3VZD6B6H29FTBMTY44ZWSMW5","type":"stacker","locked":"17000000000","until":"708050"}
{"address":"SP32X0BRC5J1BTC88MFGHTBQ8ANWN243PVM0HTV9Y","type":"stacker","locked":"30000000000","until":"708050"}
{"address":"SP32XD1F46VPYGWSWFXGBKM2JWNK5TWKSNWB6PK7J","type":"stacker","locked":"50000000000","until":"708050"}
{"address":"SP3335VRW7MEP5PXZ8ZFS7FDJBX2DXX374T0QVZDX","type":"stacker","locked":"2499000000","until":"708050"}
{"address":"SP335WVA3CRKPWH73Z535PRK5995W2QA4BPPSDRSW","type":"stacker","locked":"1000000000","until":"708050"}
{"address":"SP33DF00JSGZHJ2TJSNNCWQQHXMVK0384ZMYBCWJ9","type":"stacker","locked":"354481800","until":"708050"}
{"address":"SP33S5RP1DSNYX9AZJ5C96EA9RQNVM1Y1WJYCDRG1","type":"stacker","locked":"91712000000","until":"708050"}
{"address":"SP34194H4V84A99FR64ZEMSMFPKQWH92XS0X5FRXX","type":"stacker","locked":"120000000000","until":"708050"}
{"address":"SP344FXYA19N7RX3MSBRHKZ8R830ZVP6XB24GT605","type":"stacker","locked":"4997571600","until":"708050"}
{"address":"SP344KKNJ86Q7H592V9VTY4KG2V5QS1CGQFNRP3QZ","type":"stacker","locked":"10000000000","until":"708050"}
{"address":"SP345A685CP2YB3J7WWTQKF3Y9SWCVETXHQNMBXDX","type":"stacker","locked":"477310793","until":"708050"}
{"address":"SP348BNKDH8AFYF04FRKS6FE1DN8YJXNMGQEZDD6X","type":"stacker","locked":"101417697","until":"708050"}
{"address":"SP34BD9Y4F4VVJSVJSET42CWKW6K0A81D1YBC0NVH","type":"stacker","locked":"2000000000","until":"708050"}
{"address":"SP34N4BJVEHDRBFYMR61AQ066474N06XWSJZJXFQK","type":"stacker","locked":"125000000","until":"708050"}
{"address":"SP34V4SST6CRC1X81J4494HJ041NENQ5QSXZ9J1X4","type":"stacker","locked":"601018000000","until":"708050"}
{"address":"SP359XCXKRQYPM5FRN3YY8TQH8EMWQRPCD1KR80CC","type":"stacker","locked":"1106000000","until":"708050"}
{"address":"SP35T2XPRFV930TZ8N3EZ7GA04EHAF4JBYRBK0R17","type":"stacker","locked":"99072000000","until":"708050"}
{"address":"SP36GDZEKRN5RES3PRHVK0V8WKAE35DZEJZJPQG6H","type":"stacker","locked":"1195000000","until":"708050"}
{"address":"SP36Y8XKYDC1KWVZCMVJ34YBQN4XZXTH5KJ5D72TX","type":"stacker","locked":"371896771","until":"708050"}
{"address":"SP37C6HQRQ4GYP1EMEK7KW31HG7G5JNZ5ZPFQMP57","type":"stacker","locked":"25000000000","until":"708050"}
{"address":"SP38HVW2KCREMH2J9HDJR8EZ7EXCJWMZ2M1YACP19","type":"stacker","locked":"90999000000","until":"708050"}
{"address":"SP39K85BYDZ9D34BRBKE60X622MA0JKQAS1NB27S8","type":"stacker","locked":"1500000000","until":"708050"}
{"address":"SP39VZBGWRZQZW3B0K7CHRYXGFKV1MVVVXF7HVWE3","type":"stacker","locked":"8460000000","until":"708050"}
{"address":"SP39W418XW5K075CTXEQYA2R3P3Y552QCCGV96F20","type":"stacker","locked":"111668000000","until":"708050"}
{"address":"SP3B7BNQP8XA9DH5CK6XDYHCAME008D46BD77XBM4","type":"stacker","locked":"99000000","until":"708050"}
{"address":"SP3BA14EBS58TY6MGMV6KQB47YHNPSNWTN4ZTMSFR","type":"stacker","locked":"110000000000","until":"708050"}
{"address":"SP3BZZ4HY118YANTMV7SEBPC98RNTT0CQ5SGGXQ55","type":"stacker","locked":"97776000000","until":"708050"}
{"address":"SP3C049E6CNBTPFQ6GMSWHT0FHQQ0208843MRD67B","type":"stacker","locked":"40000000","until":"708050"}
{"address":"SP3CBKJV78QSSY1MHDHH3E5FDJNEJJVMHAJ3Q9K17","type":"stacker","locked":"416466000000","until":"708050"}
{"address":"SP3CM7FQPGXDH8V23J29QZ025RVR1RBY1BK0BNM82","type":"stacker","locked":"4000000000","until":"708050"}
{"address":"SP3CP1DD0BH9EA9PX08DWBAYV9RCEH2R0PDM90TNT","type":"stacker","locked":"474000000","until":"708050"}
{"address":"SP3CR120Z3QRMQZN9J21QNR663PX7ZVTD3970GRR0","type":"stacker","locked":"123141600","until":"708050"}
{"address":"SP3CVFTJRWMM76GSBWG4WFKAR4P4WQJR7HVB55N8M","type":"stacker","locked":"519000000","until":"708050"}
{"address":"SP3CXP82SP2M920C5XX42RMAJ3Y6FS0KS5ZK1N1BC","type":"stacker","locked":"8000000000","until":"708050"}
{"address":"SP3CZFTS449PGACNX85PAK882PTZK9502PZ70RJ75","type":"stacker","locked":"1000000000","until":"708050"}
{"address":"SP3D5HNRZQDKYS3RRFSCZ33MZ0MH0FCYNMVRV3AWJ","type":"stacker","locked":"2885000000","until":"708050"}
{"address":"SP3D5TAQAMG3DZYKCH3CXCG4RZ4H5DNJ1WV8ZXSBR","type":"stacker","locked":"1100000000","until":"708050"}
{"address":"SP3DJWHZ1A091441XAK7FJAYWS5TNVPNX6DPYG5D5","type":"stacker","locked":"800000000","until":"708050"}
{"address":"SP3DXVQCHKPCADYA1HC82YYC7FVJDT65VRN0RH32H","type":"stacker","locked":"10000000000","until":"708050"}
{"address":"SP3E01HSR8SC25QPK5YXY9R04V2YYMFP34W3ZPPTM","type":"stacker","locked":"32575000000","until":"708050"}
{"address":"SP3E13ZCYW2ZQQCFN6YEN6NXK56HNFRAY3MJ6PGB0","type":"stacker","locked":"3710912828","until":"708050"}
{"address":"SP3E6S7TDY2C19J0VNRPARX454ZWNE63S8HSN2VSZ","type":"stacker","locked":"8080000000","until":"708050"}
{"address":"SP3EHY1QQX1DEJK1HR2DTK5BH92A252ZSZACV3QM8","type":"stacker","locked":"4774000000","until":"708050"}
{"address":"SP3EXTHZ7PHAJ8DDJB7AMVQXDZ6T68364EZ01WB20","type":"stacker","locked":"959030356","until":"708050"}
{"address":"SP3FEHH7WAWGNDTXC6CMX1NV4S8331BK55CQ04XGV","type":"stacker","locked":"261988000000","until":"708050"}
{"address":"SP3FJ31S46NS9XJEXK40ACV2MNFFKV421095ZWDQW","type":"stacker","locked":"580000000","until":"708050"}
{"address":"SP3GDZH3XEN81H6PWDA7WN6KW7E8V2C219X10NRTN","type":"stacker","locked":"1050000000","until":"708050"}
{"address":"SP3GSKXZWRXZ6Z42M6M7CYN4FTPJFQHXVNCNN1TBR","type":"stacker","locked":"12619000000","until":"708050"}
{"address":"SP3H3BJ7H35QM2RNV5TEAJC6BAY3VQTCCN7HNH1NQ","type":"stacker","locked":"50000000","until":"708050"}
{"address":"SP3H6X82CFV3E3KRNX194Z30DNT9V3KFG2VB2YM4B","type":"stacker","locked":"96962813","until":"708050"}
{"address":"SP3HPDJD9CGSGG7MC2HMFTFAPAJ3VFSQ3Y3FPZXFV","type":"stacker","locked":"1137759100","until":"708050"}
{"address":"SP3J1J8SXVAEFB0YGDFA3CJFM99Q2FKK67B82E10","type":"stacker","locked":"515000000","until":"708050"}
{"address":"SP3J5KNPHSFM9Z751060HEN49PZSZGZ28QAS2SWWD","type":"stacker","locked":"197916000000","until":"708050"}
{"address":"SP3J66FRWD9MP6X2PJD6197YMSYKNGW2MTHA7P2Z2","type":"stacker","locked":"1154000000","until":"708050"}
{"address":"SP3JNTAQVKN7B7521RJRHW9NT37B6BADED6ZG8R79","type":"stacker","locked":"500000000000","until":"708050"}
{"address":"SP3JP38M5S9WG2JXHM3NPGGPZF6CRS7RP5XXSP11M","type":"stacker","locked":"1027000000","until":"708050"}
{"address":"SP3JZ4CDBEWNZEA8EXXNWFQ98FQ0VMZS453VJB2TF","type":"stacker","locked":"760975600","until":"708050"}
{"address":"SP3K264JEZ5C3QRZ51GE167G8X520CCV0M7G08PFV","type":"stacker","locked":"12000000000","until":"708050"}
{"address":"SP3KEDCZ6BNBT1GFTG2XJXR6WZB1Q6NK624EV96GR","type":"stacker","locked":"2847000000","until":"708050"}
{"address":"SP3KWVT3CTP9KDQPGACJVBPR1T22S2AZE77FQ8VEW","type":"stacker","locked":"1000000000","until":"708050"}
{"address":"SP3M7K8GEZ8FCDW922R6P7YZYFMD7C4HJJ5K0R4D3","type":"stacker","locked":"107852941","until":"708050"}
{"address":"SP3M91PQ2VAS67804G7DBMCSFR87V38GTHDWYS6NJ","type":"stacker","locked":"900000000","until":"708050"}
{"address":"SP3MBV19ABTV3ZDY8RC1EKQC1ECN1JRBT0B1KJWEG","type":"stacker","locked":"157000000","until":"708050"}
{"address":"SP3MGK82ZAMSF309ME63SAF9CEW42X5JAMXYFF08S","type":"stacker","locked":"99999784","until":"708050"}
{"address":"SP3MJ8PXRZSYHQX6AYQXGA1GRGA4W2NJKN3NFY3TY","type":"stacker","locked":"2085270000000","until":"708050"}
{"address":"SP3MNXF624DWVA6R4P79XC7HS378BZJC17178SDVF","type":"stacker","locked":"10100000000","until":"708050"}
{"address":"SP3NFAYYF2G6EZD91KDZZFBF94HH13Q9WKRT8DHBS","type":"stacker","locked":"449999000000","until":"708050"}
{"address":"SP3P1ZA7S3QF5QQAMZK3QDKQ9TPX0AZ1ZPKD118RQ","type":"stacker","locked":"23000000000","until":"708050"}
{"address":"SP3P8ZWARDDFEWHEVJ85RR2V89PT4VBEQKFP4KE09","type":"stacker","locked":"990000000","until":"708050"}
{"address":"SP3PEHCWSEZ6D1M3950ZTY71EK8DAK4A5ZQ0B3DTR","type":"stacker","locked":"989000000","until":"708050"}
{"address":"SP3PGB46DX8M0M679J4Z1AETEGMCK7ZJDYJV7MEM9","type":"stacker","locked":"2355000000","until":"708050"}
{"address":"SP3Q0DJE6GPY4V0WBKKAE2GGFJ3W2X7ETVSFRANW7","type":"stacker","locked":"5056000000","until":"708050"}
{"address":"SP3R6JQPJMGNZ49YWB4ZCD9T4SQZCSTQF0YYN8XF1","type":"stacker","locked":"17000000000","until":"708050"}
{"address":"SP3RFER8H3CF3516X77GPTXM7W237BEKPJVE9BQV6","type":"stacker","locked":"1190000000","until":"708050"}
{"address":"SP3RYV2GY2ZCXHD8WKZ1WQD1Z38Q67E82PBV6N5M1","type":"stacker","locked":"754000000","until":"708050"}
{"address":"SP3S8H7JJ1TTRMY28DF46ZJYFHF7GNEJ2PJXP7FPZ","type":"stacker","locked":"2043761200","until":"708050"}
{"address":"SP3SJFERFAW051RK9Q74QZ6G7AC5M9T9ZM5FAZ8N3","type":"stacker","locked":"814899158","until":"708050"}
{"address":"SP3SKGVBYQMQAWSA9FY11P5QC7NVNG55XGQ4VZKSJ","type":"stacker","locked":"1090000000","until":"708050"}
{"address":"SP3SNKQXCTVGQ3Z4VRR443CJT5KX96CX7PZ4F89J1","type":"stacker","locked":"28300000000","until":"708050"}
{"address":"SP3V0YTM40AD2DD0094C6ATT9Y1T4T7TJ8MKPDEFE","type":"stacker","locked":"99999784","until":"708050"}
{"address":"SP3VJN00MMZK90SF5R1BE6BFW5GXH4MDR577S5NS6","type":"stacker","locked":"107913600","until":"708050"}
{"address":"SP3W7P3S6HEHR9ZJ91DZEC683WFYCDACNHVWSAN5K","type":"stacker","locked":"2951388890","until":"708050"}
{"address":"SP3WVC89JPADZQJ0RFQS1D1627NS1AK375RM6E5FR","type":"stacker","locked":"9557000000","until":"708050"}
{"address":"SP3WXNVPY9J007AASZYYTSEWGPXJW1H1MRSC1A9NJ","type":"stacker","locked":"2495000000","until":"708050"}
{"address":"SP3XGET4RTB4W79CHDBG0VPH4J4PM9KNEW7WVE8YP","type":"stacker","locked":"30000000000","until":"708050"}
{"address":"SP3YDEH3QZFCAZWTKT5NF3MYREMNTJEDC94Z3P3SZ","type":"stacker","locked":"50948000000","until":"708050"}
{"address":"SP3Z3YSTD32DQZAD9N9P828B9Y9J4R3556TFRGN4B","type":"stacker","locked":"539000000","until":"708050"}
{"address":"SP3Z8QJH6CVGJ0JK163HZN2N9WYPZGRW1F79KD7B7","type":"stacker","locked":"450000000","until":"708050"}
{"address":"SP3ZJM0P0PRT48V9S5DX8X1BBZVX1HN0P53X3DHCJ","type":"stacker","locked":"1015000000","until":"708050"}
{"address":"SP3ZY5DBKBBXWJPSCV1G7SEMTPAGT7C659A42AF2A","type":"stacker","locked":"4427000000","until":"708050"}
{"address":"SP4GPHGXSRZRS3KP247WCHTQR3KWCVTH1SJCPFG9","type":"stacker","locked":"1150000000","until":"708050"}
{"address":"SP50KZKGN80RFXYX8CGT4B3SSNBC6CM4A65TZX8F","type":"stacker","locked":"168000000000","until":"708050"}
{"address":"SP54PT5NZ6FG8PFWXYE41QDKKS1RMJBM95G3DAT4","type":"stacker","locked":"8847000000","until":"708050"}
{"address":"SP59BTR4KAH1P6DBEN7R3JFYZ64D1D2NFWA6KA09","type":"stacker","locked":"99990000000","until":"708050"}
{"address":"SP5GPBPTA8XGKYFD6HSZZ7FZ24Z274ZKZNDR52F5","type":"stacker","locked":"1507000000","until":"708050"}
{"address":"SP5MFMXM5YGZKCH23Y5TMETED6H115VS1P12GGCV","type":"stacker","locked":"877874000000","until":"708050"}
{"address":"SP5TN2MP8EW41ECDDS9R10AZJAACV5RFBVP6PR6X","type":"stacker","locked":"10000000000","until":"708050"}
{"address":"SP661DNB6KZH6YBT1Y32NCDHNJE042ZY7B8JA9WW","type":"stacker","locked":"60867807","until":"708050"}
{"address":"SP6MQQKG8Z2B3AWWMAWNX07TZV1NJ4YAWGJGER02","type":"stacker","locked":"402020900","until":"708050"}
{"address":"SP7383KRJA9AQAY9WS1AKAPG4KAR9ERQM3586AZ3","type":"stacker","locked":"522000000","until":"708050"}
{"address":"SP779SC9CDWQVMTRXT0HZCEHSDBXCHNGG7BC1H9B","type":"stacker","locked":"420000000","until":"708050"}
{"address":"SP7RKS2TA7SF2WC67CGQTTNX4HNV5D17AT0V52VF","type":"stacker","locked":"590000000","until":"708050"}
{"address":"SP8GC9E9DG0D88C5Y0017KGKAPZY2PTF2486F1KE","type":"stacker","locked":"85848600","until":"708050"}
{"address":"SP8YV7E4J52P3ZQ37FS668GF2283VCQWS1YET8YM","type":"stacker","locked":"800000000","until":"708050"}
{"address":"SP902WD2M3X15KKGH21AGS2TXAQKWHK1WYZSSPW5","type":"stacker","locked":"205000000","until":"708050"}
{"address":"SP9AM4Q82D0PJ94GDKDSP28T5FZFYMZGAVDCH0E8","type":"stacker","locked":"4386149784","until":"708050"}
{"address":"SP9B0JGYFZ264QPTRDGEN40E6YABWZWT130HQ096","type":"stacker","locked":"83332999048","until":"708050"}
{"address":"SP9FBRFC028FW65C6CB8ZWQG2C62Z9DVQGX0DPVD","type":"stacker","locked":"20000000000","until":"708050"}
{"address":"SPAFCC0QT811JJZPXSND3R1B532E2A5PPMS0Q5DB","type":"stacker","locked":"25000000000","until":"708050"}
{"address":"SPB09CGY9D3K3X4CZQH6903J73Z9B0M7J0ZMXF3S","type":"stacker","locked":"229000000000","until":"708050"}
{"address":"SPB2VP5GVD980MERQS4J4H479RGKP1TKSF24BHTM","type":"stacker","locked":"10337618200","until":"708050"}
{"address":"SPB8AQRQEQBQJACHKA7GRQ2ET0ECMH9ZA263Q7HH","type":"stacker","locked":"289000000","until":"708050"}
{"address":"SPBAKJP8T37GHPVMV5RX2N0EDCMX79RQXPGSJSDB","type":"stacker","locked":"2114000000","until":"708050"}
{"address":"SPBRMYM12MZKGRBJWBP3VPT845FGXP58041M7H63","type":"stacker","locked":"9050000000","until":"708050"}
{"address":"SPBZ2DQK8X21XJ3DJGV4XVXDBEVWATF33VDEV4ZA","type":"stacker","locked":"1692000000","until":"708050"}
{"address":"SPC30NARAGTSQ4DEER9NM4CV7CWH2JMJZBKJ90G9","type":"stacker","locked":"99999820","until":"708050"}
{"address":"SPCAMN538MMY913N9GBVGFA7X8R77HYWH3WC9YM2","type":"stacker","locked":"2995000000","until":"708050"}
{"address":"SPCGG9JHFJDRH6BBGAR8GHPDECVAZMRZ87M1BHKV","type":"stacker","locked":"800000000","until":"708050"}
{"address":"SPD63E5WQMR9B2ART8M8HADE7WCW99B12EPSR91F","type":"stacker","locked":"1712000000","until":"708050"}
{"address":"SPDANHG1WBW18ZAKFZJCG58GXGCX8P29ENFPCD1E","type":"stacker","locked":"14027000000","until":"708050"}
{"address":"SPDGHTX6ZC90DFYCWJW8MWVWFHMF8W0TB0B49HCV","type":"stacker","locked":"450000000","until":"708050"}
{"address":"SPDGRNM9BFDXQ4XN9HANT0F7MN2Z97QKDB5ZYB5B","type":"stacker","locked":"100000000","until":"708050"}
{"address":"SPDQXZT4CDB9BCCC53CGW0G0052EQ8ZZYK04FTCM","type":"stacker","locked":"200000000","until":"708050"}
{"address":"SPF13R8KGZ8B1B841X30Y2Q6BNANB2YZC3Z6WV7X","type":"stacker","locked":"100000000","until":"708050"}
{"address":"SPFAT16GY08EJ501BZJEQESREAKWMD3QR5QSQT0B","type":"stacker","locked":"500000000","until":"708050"}
{"address":"SPFY12M55M6BJ4VRKJ58Q4N9TV0P3MPQG460N0FV","type":"stacker","locked":"100000000","until":"708050"}
{"address":"SPGMF8QX45FMB20TAN8YHNYFMZAQWWAD0X2WNX6F","type":"stacker","locked":"167000000","until":"708050"}
{"address":"SPH00JPEQVPRQ87Q3ED2MBH0CY831R5KG645Y849","type":"stacker","locked":"216399346","until":"708050"}
{"address":"SPHSCF96PYMYB7W4WZC7ZBKQ7SECN2AW8J4MNFKJ","type":"stacker","locked":"100000000","until":"708050"}
{"address":"SPJ4SME1JBZ0682X48AJYAP5FPFBVVY4BCAMSRZ4","type":"stacker","locked":"2570000000","until":"708050"}
{"address":"SPJZRVAH1CS8G973V76MS15WZ3WBABVA6YSAE3JP","type":"stacker","locked":"58480000000","until":"708050"}
{"address":"SPKN4AYXSV5VTS1KP4DWKVQMZDHQW2YKP01CP1DZ","type":"stacker","locked":"3016788600","until":"708050"}
{"address":"SPKQVJZM28WJT70G3AP7B0PA5EG4HJ8NH97JK42B","type":"stacker","locked":"4400000000","until":"708050"}
{"address":"SPM4JKECG23CJGXC93BDXX7579WVH5NR7E2XVC5H","type":"stacker","locked":"500000000","until":"708050"}
{"address":"SPM97MPV98TWEKPXS8X5FTVHXY5CJQC24X30SFJV","type":"stacker","locked":"1600000000","until":"708050"}
{"address":"SPN06A0FNBXETTYAM9GAWPNNXFH6ZDYFENMT4S21","type":"stacker","locked":"2000000000","until":"708050"}
{"address":"SPNRPD2W804W5HMNXD5RDCPF5Z5CTZZM8KCSW2ZK","type":"stacker","locked":"9869793234","until":"708050"}
{"address":"SPPW17XYT85QBZJKW6W8KZ3T014JKEAYX2VA4HCC","type":"stacker","locked":"200173858","until":"708050"}
{"address":"SPR30KK2JTWVPM9ZB3EE05H8HFDYVSHDNKVFXJ8G","type":"stacker","locked":"20976470831","until":"708050"}
{"address":"SPRSNP97S0V51DCC4HM6PVW2GNDATY3P58R1689N","type":"stacker","locked":"700000000","until":"708050"}
{"address":"SPS4H96TGHT5JFXC0NF24GHWC4W12VKSSD5B7SC1","type":"stacker","locked":"498800000","until":"708050"}
{"address":"SPSA1SNVCV3ZRE3H3E2C4ABK460F9M91S9VTCR06","type":"stacker","locked":"7990000000","until":"708050"}
{"address":"SPSDGXANQ8E2RPHQ9GG9H189ZMQ77FVJ5HDJ1859","type":"stacker","locked":"15000000000","until":"708050"}
{"address":"SPT977DSCQVH1TZB4RMB3K4C5MKHB3R1KJPR0CAX","type":"stacker","locked":"5800000000","until":"708050"}
{"address":"SPT9D276954SH8V2Q9D45MN39FP3QNA8W9JB69DZ","type":"stacker","locked":"279786875000","until":"708050"}
{"address":"SPTFVW7ZS2E0GBWFHA3SKHN1A8J4RZFGAK6MA6PB","type":"stacker","locked":"969313600","until":"708050"}
{"address":"SPTP2RCF0MQMTHT7NGX5R2N0PHC6K0AEJGW26638","type":"stacker","locked":"83332000000","until":"708050"}
{"address":"SPV34QKJRAYEM871PY5EHGTRCEV6V6HZ5NZEWFJ9","type":"stacker","locked":"25000000000","until":"708050"}
{"address":"SPVNCNJHQPB0197CM5XXSGWWPFT6KEAZ60AJRE4S","type":"stacker","locked":"1500000000","until":"708050"}
{"address":"SPVQ9A57NG0SVWV4E82K8VRJYSZ5Y7AHXP5CB4W7","type":"stacker","locked":"192617000000","until":"708050"}
{"address":"SPVWV1TG5FXE9P8JCJ7BEPD3ZVVKSS1Y1R2T7HDS","type":"stacker","locked":"250372061","until":"708050"}
{"address":"S