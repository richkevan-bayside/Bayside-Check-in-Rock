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
        <!-- Ajax Error -->
        <div class="alert alert-danger ajax-error no-index" style="display:none">
            <p><strong>Error</strong></p>
            <span class="ajax-error-message"></span>
        </div>

        <div class="row">
            <Rock:Zone Name="Feature" CssClass="col-md-12" runat="server" />
        </div>

        <div class="row">
            <Rock:Zone Name="Main" CssClass="main-content col-md-9" runat="server" />
            <Rock:Zone Name="Sidebar 1" CssClass="col-md-3 aside" runat="server" />
        </div>

        <div class="row">
            <div class="col-md-12">
                <Rock:Zone Name="Section A" runat="server" />
            </div>
        </div>

        <div class="row">
            <div class="col-md-4">
                <Rock:Zone Name="Section B" runat="server" />
            </div>
            <div class="col-md-4">
                <Rock:Zone Name="Section C" runat="server" />
            </div>
            <div class="col-md-4">
                <Rock:Zone Name="Section D" runat="server" />
            </div>
        </div>

        <!-- End Content Area -->

    </main>

</asp:Content>
