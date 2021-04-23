<%@ Page Language="C#" MasterPageFile="Site.Master" AutoEventWireup="true" Inherits="Rock.Web.UI.RockPage" %>

<asp:Content ID="ctMain" ContentPlaceHolderID="main" runat="server">
        <!-- Page Title -->
        <section class="hero">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <h1 class="pagetitle"><Rock:PageTitle ID="PageTitle" runat="server" /></h1>
                        <Rock:PageBreadCrumbs ID="PageBreadCrumbs" runat="server" />
                    </div>
                </div>
            </div>
        </section>

    <main class="main container">

        <!-- Start Content Area -->

        <!-- Ajax Error -->
        <div class="alert alert-danger ajax-error no-index" style="display:none">
            <p><strong>Error</strong></p>
            <span class="ajax-error-message"></span>
        </div>

        <div class="row">
            <Rock:Zone Name="Feature" CssClass="main-content col-md-12" runat="server" />
        </div>

        <div class="row">
            <Rock:Zone Name="Sidebar 1" CssClass="aside col-md-3" runat="server" />
            <Rock:Zone Name="Main" CssClass="main-content col-md-9" runat="server" />
        </div>

        <div class="row">
            <Rock:Zone Name="Section A" CssClass="main-content col-md-12" runat="server" />
        </div>

        <div class="row">
            <Rock:Zone Name="Section B" CssClass="col-md-4" runat="server" />
            <Rock:Zone Name="Section C" CssClass="col-md-4" runat="server" />
            <Rock:Zone Name="Section D" CssClass="col-md-4" runat="server" />
        </div>

        <!-- End Content Area -->

    </main>

</asp:Content>
